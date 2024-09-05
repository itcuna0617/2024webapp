<template>
  <div
    class="container-fluid d-flex justify-content-center align-items-center"
    style="min-height: 100vh"
    id="portfolio"
  >
    <div class="container">
      <h2 class="text-center">Portfolio</h2>
      <p class="text-center mb-5">Lorem ipsum dolor sit amet.</p>

      <div class="row">
        <div class="col-md-4 text-center d-flex flex-column align-items-center">
          <img
            src="../assets/images/illustration-features-tab-1.svg"
            alt=""
            class="img-fluid mb-3"
            style="height: 200px"
          />
          <button
            class="btn btn-primary"
            @click="$router.push({ path: '/portfolio/1' })"
          >
            view
          </button>
        </div>
        <div class="col-md-4 text-center d-flex flex-column align-items-center">
          <img
            src="../assets/images/illustration-features-tab-2.svg"
            alt=""
            class="img-fluid mb-3"
            style="height: 200px"
          />
          <button
            class="btn btn-primary"
            @click="$router.push({ path: '/portfolio/2' })"
          >
            view
          </button>
        </div>
        <div class="col-md-4 text-center d-flex flex-column align-items-center">
          <img
            src="../assets/images/illustration-features-tab-3.svg"
            alt=""
            class="img-fluid mb-3"
            style="height: 200px"
          />
          <button
            class="btn btn-primary"
            @click="$router.push({ path: '/portfolio/3' })"
          >
            view
          </button>
        </div>
      </div>
    </div>
    s
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
