# voyager.technology

**code to set up an open source voyager implementation**

```
sudo apt-get update
sudo apt-get install apache2 nodejs
a2enmod proxy
a2enmod proxy_http
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.bak
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/voyager.technology.conf
sudo nano /etc/apache2/sites-available/voyager.technology.conf
sudo a2ensite voyager.technology.conf
sudo a2dissite 000-default.conf
sudo systemctl reload apache2
sudo systemctl restart apache2
```

***Data Sources***
[New Jersey Counties](https://opendata.arcgis.com/datasets/5f45e1ece6e14ef5866974a7b57d3b95_1.geojson)
sudo ogr2ogr -f "PostgreSQL" PG:"dbname=safety_voyager user=postgres password=GPI2018!" "new_jersey_counties.geojson" -nln county

[New Jersey Municipalties](https://opendata.arcgis.com/datasets/3d5d1db8a1b34b418c331f4ce1fd0fef_2.geojson)
sudo ogr2ogr -f "PostgreSQL" PG:"dbname=safety_voyager user=postgres password=GPI2018!" "new_jersey_municipalities.geojson" -nln municipality


