<?php
namespace Services;

use Repositories\RoleRepositoryInterface;

class RoleService {
    private $repository;
    
    public function __construct(RoleRepositoryInterface $repository) {
        $this->repository = $repository;
    }
    
    public function getAllRoles(): array {
        return $this->repository->getAll();
    }
    
    public function createRole(array $roleData): array {
        // Validar datos
        if (empty($roleData['role_name'])) {
            throw new \InvalidArgumentException('El nombre del rol es requerido');
        }
        
        // Verificar si el nombre ya existe
        if ($this->repository->isRoleNameInUse($roleData['role_name'])) {
            throw new \InvalidArgumentException('El nombre del rol ya está en uso');
        }
        
        return $this->repository->create($roleData);
    }
    
    public function updateRole(string $role_id, array $roleData): array {
       print_r($role_id);
       print_r($roleData);
        exit;
        // Validar datos
        if (empty($roleData['role_name'])) {
            throw new \InvalidArgumentException('El nombre del rol es requerido');
        }
        
        // Verificar si el nombre ya existe (excluyendo el rol actual)
        if ($this->repository->isRoleNameInUse($roleData['role_name'], $role_id)) {
            throw new \InvalidArgumentException('El nombre del rol ya está en uso');
        }
        
        return $this->repository->update($role_id, $roleData);
    }
    
    public function deleteRole(string $role_id): bool {
        return $this->repository->delete($role_id);
    }
}