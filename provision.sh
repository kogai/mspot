#!/usr/bin/env bash

LC_ALL=C
export LC_ALL
sudo yum update

# centOSのバージョンを確認
cat /etc/redhat-release

# apacheのバージョン確認
httpd -v

# phpのバージョン確認
php -v

# mysqlのバージョン確認
rpm -qa | grep mysql

# sudo yum -y update
# sudo yum -y install httpd
# sudo yum localinstall MySQL-client-5.1.73-1.glibc23.x86_64.rpm
# sudo yum localinstall MySQL-server-5.1.73-1.glibc23.x86_64.rpm
# sudo yum localinstall MySQL-shared-5.1.73-1.glibc23.x86_64.rpm

sudo service httpd start
sudo service mysqld start

sudo chkconfig httpd on
sudo chkconfig iptables off
sudo chkconfig mysqld on

# シンボリックリンクの設定
# sudo rm -rf /var/www/html
# sudo ln -fs /vagrant/build /var/www/html

echo START TECHNOPRO CONSTRUCT ENGINEERING.
