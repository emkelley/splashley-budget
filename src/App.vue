<template>
  <div id="app">
    <section class="budget">
      <div class="columns">
        <div class="column">
          <button @click="openNewCatPrompt" class="button is-primary is-medium">
            Add Category</button
          ><br /><br />
          <h3 class="subtitle">
            Enter the estimated amounts per month - {{ catValueArray }}
            {{ catNameArray }}
          </h3>
          <hr />
          <div class="category-wrapper">
            <div
              v-for="category in categories"
              :key="category.id"
              class="category"
              style="margin-bottom: 2rem; border: 1px solid grey; padding: 2rem"
            >
              <div class="level">
                <div class="level-left">
                  <div class="level-item category--name">
                    <p>{{ category.name }}</p>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item category-amount">
                    $
                    <b-input
                      v-model="category.amount"
                      style="margin-right: 1rem"
                    ></b-input>
                    /MONTH
                  </div>
                </div>
              </div>
              <br />
              <b-slider
                v-model="category.amount"
                size="is-large"
                :min="0"
                :max="500"
              >
                <template v-for="val in [0, 500]">
                  <b-slider-tick
                    style="margin-top: 1rem"
                    :value="val"
                    :key="val"
                  >
                    {{ val }}
                  </b-slider-tick>
                </template>
              </b-slider>
            </div>
          </div>
        </div>
        <div class="column">
          <div id="chart">
            <center>
              <apexchart
                type="pie"
                width="450"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </center>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      newCategoryName: false,
      newCatName: undefined,
      categories: [
        {
          id: 1,
          name: "Meds",
          amount: 50,
        },
        {
          id: 2,
          name: "Food",
          amount: 300,
        },
      ],
      series: [],
      chartOptions: {
        chart: {
          width: 380,
          type: "polarArea",
        },
        labels: [],
        fill: {
          opacity: 1,
        },
        stroke: {
          width: 1,
          colors: undefined,
        },
        yaxis: {
          show: false,
        },
        legend: {
          position: "bottom",
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0,
            },
          },
        },
        theme: {
          monochrome: {
            enabled: true,
            shadeTo: "light",
            shadeIntensity: 0.6,
          },
        },
      },
    };
  },
  mounted() {
    this.updateChartLabels(this.catValueArray);
    this.updateChartData(this.catNameArray);
  },
  computed: {
    catValueArray() {
      const arr = [];
      this.categories.forEach((category) => {
        arr.push(category.amount);
      });
      this.updateChartData(arr);
      return arr;
    },
    catNameArray() {
      const arr = [];
      this.categories.forEach((category) => {
        arr.push(category.name);
      });
      this.updateChartLabels(arr);
      return arr;
    },
  },
  methods: {
    openNewCatPrompt() {
      this.$buefy.dialog.prompt({
        message: `What category would you like to add?`,
        inputAttrs: {
          placeholder: "Pizza Fund",
          maxlength: 50,
        },
        trapFocus: true,
        onConfirm: (value) => this.addNewCategory(value),
      });
    },
    addNewCategory(name) {
      const randID = Math.random()
        .toString(36)
        .substring(7);
      this.categories.push({
        id: randID,
        name: name,
        amount: 0,
      });
      this.updateChartLabels(this.catNameArray);
      this.newCatName = undefined;
    },
    updateChartLabels(arr) {
      this.chartOptions.labels = arr;
    },
    updateChartData(arr) {
      this.series = arr;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #2c3e50;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .budget {
    background: white;
    border-radius: 25px;
    padding: 5rem;
    width: 100vw;
    margin-left: 5rem;
    margin-right: 5rem;
  }
}
</style>
