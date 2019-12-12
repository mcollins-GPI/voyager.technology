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
