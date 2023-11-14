.PHONY: dev
dev:
	docker compose up --force-recreate --build
.PHONY: migrate-up migrate-down
migrate-up:
	ENTRYPOINT="npm run migrate up" docker compose run --rm --use-aliases --build api 
migrate-down:
	ENTRYPOINT="npm run migrate down" docker compose run --rm --use-aliases --build api 