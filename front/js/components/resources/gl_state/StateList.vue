<template>
  <div class="container-fluid">
    <br />
    <h1>{{ list_title }}</h1>
    <app-add-button @click="list_onAddClick"></app-add-button>
    <br />
    <br />
    <div class="form-row">
      <div class="form-group col-12">
        <div class="input-group mb-3">
          <input
            type="text"
            v-model="searchText"
            class="form-control"
            placeholder="pesquisar"
            aria-label="pesquisar"
            @keyup.enter="list_refreshCurrentPage"
          />
          <div class="input-group-append">
            <button
              class="btn btn-primary"
              type="button"
              @click="list_refreshCurrentPage"
            >
              <i class="fa fa-search"></i> Filtrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-hover table-striped">
      <thead>
        <tr class>
          <th>#</th>
          <th>Nome</th>
          <th>Sigla</th>
          <th>Código IBGE</th>
          <th>País</th>
          <th class="text-right">Prioridade</th>
        </tr>
      </thead>
      <tbody>
        <tr
          style="cursor: pointer;"
          v-for="entity in list.data"
          :key="entity.id"
          @click="list_onItemClick(entity)"
        >
          <td>{{ entity.id }}</td>
          <td>{{ entity.name }}</td>
          <td>{{ entity.initials }}</td>
          <td>{{ entity.code }}</td>
          <td>{{ entity.country ? entity.country.code : entity.countryId }}</td>
          <td class="text-right">{{ entity.priority }}</td>
        </tr>
      </tbody>
    </table>
    <app-pagination :pagination="list" @paginate="list_refreshPage($event)" />
  </div>
</template>

<script>
  import { listMixin } from '@mixins/list-mixin';

  export default {
    mixins: [listMixin],
    components: {},
    computed: {
      list_title() {
        return 'Estados';
      },
      list_url_base() {
        return '/api/admin/gl_state';
      },
      list_route_base() {
        return 'gl_state';
      },
    },
  };
</script>

<style scoped></style>
