const sm = require('@mapbox/sphericalmercator')
const merc = new sm({
  size: 256
});

// route query
const sql = (params, query) => {
    let bounds = query.bounds ? query.bounds.split(',').map(Number) : null;
    bounds && bounds.length === 3 ? bounds = merc.bbox(bounds[1], bounds[2], bounds[0]) : null;
    let formattedQuery = `
        SELECT jsonb_build_object(
            'type',     'FeatureCollection',
            'features', jsonb_agg(features.feature)
        ) as geojson
        FROM (
            SELECT jsonb_build_object(
                'type',       'Feature',
                'geometry',   ST_AsGeoJSON(centroid)::jsonb,
                'properties', to_jsonb(inputs) - 'centroid'
            ) AS feature
            FROM (
                SELECT
                    mailingcity,
                    cluster_count,
                    centroid
                FROM (
                    SELECT merged_zip_code.mailingcity, cluster_data.count as cluster_count, ST_Centroid(geom) as centroid
                    FROM (
                        SELECT mailingcity, count(*) as count from crash_pinellas

                        -- Optional Filter
                        ${query.filter ? `AND ${query.filter}` : '' }

                        group by mailingcity
                    ) cluster_data, merged_zip_code
                    where merged_zip_code.mailingcity = cluster_data.mailingcity
                ) AS lg
            ) inputs
        ) features;
    `;
    console.log(formattedQuery);
    return formattedQuery;
}

// route schema
const schema = {
  description: 'Return table as GeoJSON.',
  tags: ['feature'],
  summary: 'return GeoJSON',
  params: {
    table: {
      type: 'string',
      description: 'The name of the table or view.'
    }
  },
  querystring: {
    filter: {
      type: 'string',
      description: 'Optional filter parameters for a SQL WHERE statement.'
    }
  }
}

// create route
module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/muniClusters/:table',
    schema: schema,
    handler: function (request, reply) {
      fastify.pg.connect(onConnect)

      function onConnect(err, client, release) {
        if (err) return reply.send({
          "statusCode": 500,
          "error": "Internal Server Error",
          "message": "unable to connect to database server"
        })
        client.query(
          sql(request.params, request.query),
          function onResult(err, result) {
            release()
            reply.send(err || result.rows[0].geojson)
          }
        )
      }
    }
  })
  next()
}

module.exports.autoPrefix = '/'
