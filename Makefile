.PHONY: dev
dev:
	docker compose up --force-recreate --build
.PHONY: migrate-up migrate-down
migrate-up:
	ENTRYPOINT="sh ./scripts/waitfor.sh db:5432 && npm run migrate up" docker compose run --rm --use-aliases --build api 
migrate-down:
	npm run migrate down