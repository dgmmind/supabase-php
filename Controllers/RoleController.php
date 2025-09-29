<?php
namespace Controllers;

use Core\BaseController;
use Services\RoleService;

class RoleController extends BaseController {
    protected $service;
    
    public function __construct($viewRenderer, $service) {
        parent::__construct($viewRenderer);
        $this->service = $service;
    }
    
    public function index() {
        $roles = $this->service->getAllRoles();
        return $this->renderView('roles/index', ['roles' => $roles]);
    }
    
    public function create() {
        return $this->renderView('roles/create');
    }
    
    public function store() {
        $roleData = $_POST;
        try {
            $role = $this->service->createRole($roleData);
            header('Location: /roles');
            exit;
        } catch (\Exception $e) {
            return $this->renderView('roles/create', ['error' => $e->getMessage()]);
        }
    }
    
    public function update($id) {
        $roleData = $_POST;
        try {
            $role = $this->service->updateRole($id, $roleData);
            header('Location: /roles');
            exit;
        } catch (\Exception $e) {
            return $this->renderView('roles/edit', ['error' => $e->getMessage()]);
        }
    }
    
    public function delete($id) {
        
        try {
            $this->service->deleteRole($id);

        } catch (\Exception $e) {
            return $this->renderView('roles/edit', ['error' => $e->getMessage()]);
        }
    }
}