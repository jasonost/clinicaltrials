sudo yum update
sudo easy_install pip
sudo easy_install virtualenv
sudo yum install mysql-server
sudo yum install mysql-devel
sudo yum install nginx
sudo yum install numpy scipy
sudo chkconfig mysqld on
sudo chkconfig nginx on
sudo /etc/init.d/nginx start


sudo service mysqld start
mysqladmin -u root password password
mysql -u root -p
mysql -u clinicaltrials -p -D clinicaltrials < ctdump.sql


sudo mkdir ../data/
sudo chmod a+rw data/
cp -rs /home/ec2-user/data/docsim_server /home/data/


gunicorn ctapp:app -p ctapp.pid -D
