<?php
namespace Repositories;

interface RoleRepositoryInterface
{
    public function getAll(): array;
    public function findById(string $id): ?array;
    public function create(array $data): array;
    public function update(string $id, array $data): array;
    public function delete(string $id): bool;
    public function isRoleNameInUse(string $roleName, ?string $excludeRoleId = null): bool;
}