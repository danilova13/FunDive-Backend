.PHONY: dev
dev:
	docker compose up --force-recreate --build
.PHONY: migrate-up migrate-down
migrate-up:
	ENTRYPOINT="npm run migrate up" docker compose run --rm --use-aliases api --build  
migrate-down:
	npm run migrate down