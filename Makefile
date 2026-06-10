.PHONY: help install dev build lint format preview clean test

# Variables
NODE_VERSION := 24
PNPM := pnpm

# Colores para output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

help:
	@echo "$(BLUE)MV-App - Makefile Commands$(NC)"
	@echo "$(YELLOW)Node.js Version Required: $(NODE_VERSION)$(NC)"
	@echo ""
	@echo "$(GREEN)Available commands:$(NC)"
	@echo "  $(BLUE)make install$(NC)      - Install project dependencies"
	@echo "  $(BLUE)make dev$(NC)          - Start development server"
	@echo "  $(BLUE)make build$(NC)        - Build project for production"
	@echo "  $(BLUE)make preview$(NC)      - Preview production build"
	@echo "  $(BLUE)make lint$(NC)         - Run ESLint"
	@echo "  $(BLUE)make format$(NC)       - Format code with Prettier"
	@echo "  $(BLUE)make clean$(NC)        - Clean build artifacts"
	@echo "  $(BLUE)make check$(NC)        - Run lint and type checks"
	@echo ""

check-node:
	@node --version | grep -q "v$(NODE_VERSION)" || (echo "$(YELLOW)Warning: Node.js version $(NODE_VERSION).x is recommended$(NC)" && echo "Current version: $$(node --version)")

install: check-node
	@echo "$(GREEN)Installing dependencies...$(NC)"
	$(PNPM) install

dev: check-node
	@echo "$(GREEN)Starting development server...$(NC)"
	$(PNPM) dev

build: check-node
	@echo "$(GREEN)Building for production...$(NC)"
	$(PNPM) build

preview: check-node
	@echo "$(GREEN)Previewing production build...$(NC)"
	$(PNPM) preview

lint:
	@echo "$(GREEN)Running ESLint...$(NC)"
	$(PNPM) lint

format:
	@echo "$(GREEN)Formatting code...$(NC)"
	$(PNPM) format

check: lint
	@echo "$(GREEN)Running TypeScript type check...$(NC)"
	npx tsc --noEmit

clean:
	@echo "$(GREEN)Cleaning build artifacts...$(NC)"
	rm -rf dist node_modules/.vite
	@echo "$(GREEN)Clean complete$(NC)"
