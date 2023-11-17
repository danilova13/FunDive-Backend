.PHONY: dev
dev:
	docker compose up --force-recreate --build
.PHONY: migrate-up migrate-down
migrate:
	ENTRYPOINT="sh -c 'sleep 5 && npm run migrate'" docker compose run --rm --use-aliases --build api 
migrate-revert:
	ENTRYPOINT="sh -c 'sleep 5 && npm run migrate-revert'" docker compose run --rm --use-aliases --build api 

.PHONY: build
build: 
	docker compose build api
