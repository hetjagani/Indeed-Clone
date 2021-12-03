init:
	npm install -C application
	npm install -C auth
	npm install -C chat
	npm install -C company
	npm install -C kafka-backend
	npm install -C photos
	npm install -C review
	npm install -C user
	npm install -C web

clean:
	rm -rf ./**/node_modules

run:
	docker-compose up
