package ru.mera.lib.model;

import java.util.List;

public class RolesModel {
    private List<String> roles;

    public RolesModel(List<String> roles) {
        this.roles = roles;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
