#!/usr/bin/env bash

# Setting up the database

#quick trick --
# ask chatGPT to generate a migratin script for you if you have your schema already


#authorized parents table
npx sequelize-cli model:generate --name authorised_parents --attributes email:string,password:string,childsname:string,device_id:string

#children table
npx sequelize-cli model:generate --name children --attributes device_id:string,child_name:string,email:string

#location table
npx sequelize-cli model:generate --name locations --attributes device_id:string,latitude:float,longitude:float

#app details table
npx sequelize-cli model:generate --name app_details --attributes device_id:string,installed_app_name:string,app_status:string


#Seed the database tables

#app details table
npx sequelize-cli seed:generate --name app_details

#children table
npx sequelize-cli seed:generate --name children

#location table
npx sequelize-cli seed:generate --name locations

#authorized parents table
npx sequelize-cli seed:generate --name authorised_parents



#commiting all seeds created
npx sequelize-cli db:seed:all
