https://hackernoon.com/making-node-js-service-always-alive-on-ubuntu-server-e20c9c0808e4

make a file /etc/systemd/system/default.service
an example file is included
change the name to something meaningful for the project

enable the service
sudo systemctl enable default.service
