Step 1 : npm i
step 2 : create database ex:insyd_notifications + specify correct connection url in .env.
step 3 : run  psql -U postgres -d insyd_notifications -f ./sql/init.sql to seed.

vikrant_insyd_notifications
yNDrsG0A74rC3UV75xASVLhaVftrc3T6

int url : postgresql://vikrant_insyd_notifications:yNDrsG0A74rC3UV75xASVLhaVftrc3T6@dpg-d24te01r0fns73dfgacg-a/insyd_notifications

ext url : postgresql://vikrant_insyd_notifications:yNDrsG0A74rC3UV75xASVLhaVftrc3T6@dpg-d24te01r0fns73dfgacg-a.oregon-postgres.render.com/insyd_notifications

psql command : PGPASSWORD=yNDrsG0A74rC3UV75xASVLhaVftrc3T6 psql -h dpg-d24te01r0fns73dfgacg-a.oregon-postgres.render.com -U vikrant_insyd_notifications insyd_notifications