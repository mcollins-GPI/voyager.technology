const sm = require('@mapbox/sphericalmercator')
const merc = new sm({
  size: 256
});

// route query
const sql = (params, query) => {
    let formattedQuery = `
        SELECT jsonb_build_object(
            'type',     'FeatureCollection',
            'bbox',     array[array[min(ST_XMin(features.nativeGeometry)), min(ST_YMin(features.nativeGeometry))], array[max(ST_XMax(features.nativeGeometry)), max(ST_YMax(features.nativeGeometry))]],
            'features', jsonb_agg(features.feature)
        ) as geojson
        FROM (
            SELECT jsonb_build_object(
                'type',       'Feature',
                'geometry',   ST_AsGeoJSON(wkb_geometry)::jsonb,
                'properties', to_jsonb(inputs) - 'wkb_geometry'
            ) AS feature,
            ST_Transform(wkb_geometry, 4326) as nativeGeometry
            FROM (
                SELECT
                    fullname,
                    count(crash_pinellas.*),
                    wkb_geometry,
                    array_agg(hsmv) as selectedCrashes
                FROM (
                    select wkb_geometry, fullname
        			from (
        				select ST_Union(wkb_geometry) as targetRoad
        				from centerline_buffer
                        where fullname = '${query.routeName}'
        			) as foo, centerline_buffer
        			where ST_Intersects(foo.targetRoad , centerline_buffer.wkb_geometry)
                ) AS lg, crash_pinellas
                WHERE ST_Contains(wkb_geometry, geom)

                -- Optional Filter
                ${query.filter ? `AND ${query.filter}` : '' }

                group by wkb_geometry, fullname
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
    geom_column: {
      type: 'string',
      description: 'The geometry column of the table.',
      default: 'geom'
    },
    routeName: {
      type: 'string',
      description: 'Name of the route that will be used for query.</em>'
    },
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
    url: '/routeHistogram/:table',
    schema: schema,
    handler: function (request, reply) {
        console.log('here')
      fastify.pg.connect(onConnect)

      function onConnect(err, client, release) {
          console.log('there')
        if (err) return reply.send({
          "statusCode": 500,
          "error": "Internal Server Error",
          "message": "unable to connect to database server"
        })
        console.log(sql(request.params, request.query))
        client.query(
          sql(request.params, request.query),
          function onResult(err, result) {
              console.log(err, result);
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
