<?php
namespace Repositories;

use Core\SupabaseClient;

class SupabaseRoleRepository implements RoleRepositoryInterface
{
    private $client;
    
    public function __construct(SupabaseClient $client) {
        $this->client = $client;
    }
    
    public function getAll(): array {
        $response = $this->client->request('rest/v1/roles', 'GET');
        return $response['data'] ?? [];
    }
    
    public function findById(string $role_id): ?array {
        $response = $this->client->request('rest/v1/roles', 'GET', null, "role_id=eq.$role_id");
        return $response['data'][0] ?? null;
    }
    
    public function create(array $data): array {
        $response = $this->client->request('rest/v1/roles', 'POST', $data);
        return $response['data'][0] ?? [];
    }
    
    public function update(string $role_id, array $data): array {
        $response = $this->client->request('rest/v1/roles', 'PATCH', $data, "role_id=eq.$role_id");
        return $response['data'][0] ?? [];
    }
    
    public function delete(string $role_id): bool {
        $this->client->request('rest/v1/roles', 'DELETE', null, "role_id=eq.$role_id");
        return true;
    }
    
    public function isRoleNameInUse(string $roleName, ?string $excludeRole_id = null): bool {
        $filter = "role_name=eq.$roleName";
        if ($excludeRole_id) {
            $filter .= "&role_id=neq.$excludeRole_id";
        }
        $response = $this->client->request('rest/v1/roles', 'GET', null, $filter);
        return !empty($response['data']);
    }
}