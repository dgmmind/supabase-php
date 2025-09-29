<h1>Roles</h1>

<?php
print_r($roles);
?>
<div>
    <div class="crud">
        <a href="/roles/create">Nuevo Rol</a>
        <table>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
            <?php foreach ($roles as $role): ?>
            <tr>
                <td><?= $role['role_id'] ?></td>
                <td><?= $role['role_name'] ?></td>
                <td>
                    <button type="button" class="secondary small" onclick="confirmDelete('<?= $role['role_id'] ?>', '<?= $role['role_name'] ?>')">Eliminar</button>
                    <button type="button" class="secondary small" onclick="updateRole('<?= $role['role_id'] ?>', '<?= $role['role_name'] ?>')">Editar</button>
                </td>
            </tr>
            <?php endforeach; ?>
        </table>
    </div>
</div>

<script>
    const roles = <?= json_encode($roles) ?>;
    console.log(roles);

    function confirmDelete(roleId, roleName) {
        if (confirm(`¿Está seguro de eliminar el rol "${roleName}"? Esta acción no se puede deshacer.`)) {
            deleteRole(roleId);
        }
    }

    async function deleteRole(roleId) {
        const response = await fetch(`/supabase-php/roles/${roleId}/delete`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
                });
        const result = await response.json();
        console.log(result);
    }

    async function updateRole(roleId, roleName) {
        const response = await fetch(`/supabase-php/roles/${roleId}/update`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                role_id: roleId,
                role_name: roleName
            })
        });

        const result = await response.json();
        console.log(result);
    }
</script>