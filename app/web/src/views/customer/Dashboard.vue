<script setup>
import { onBeforeMount, ref, reactive, watch, computed } from "vue";
import { useVendorStore } from "@/store/vendor";
import { useAuthStore } from "@/store/auth";
import { useOrderStore } from "@/store/order";
import { useSnackbarStore } from "@/store/snackbar";
import validator from "@/utils/validator";

const dialog = ref(false);
const form = ref();
let vendors = ref([]);
const vendorIndex = ref(0);
const juiceSelections = reactive([]);
const juiceData = reactive({
  name: "",
  juice: [],
  quantity: 0,
  date: new Date().toISOString().split("T")[0],
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
});

const validateForm = async () => {
  const formValidation = await form.value.validate();
  return formValidation.valid;
};

const loadVendors = async () => {
  const vendorStore = useVendorStore();
  await vendorStore.getVendors();

  vendors.value = vendorStore.vendors;
};

const openDialog = (index) => {
  const customer = useAuthStore().loggedUser;
  vendorIndex.value = index;

  juiceData.name = customer.name;
  juiceData.juice = [];
  juiceData.quantity = 0;
  juiceSelections.splice(0, juiceSelections.length);
  dialog.value = true;
};

const totalPrice = computed(() => {
  return juiceSelections.reduce((total, selection) => {
    const selectedJuice = vendors.value[0]?.recipes.find(
      (recipe) => recipe._id === selection._id
    );
    return total + (selectedJuice ? selectedJuice.price : 0);
  }, 0);
});

const orderMyJuice = async (vendor_id, host) => {
  if (!(await validateForm())) return;

  let message = "There's not possible order your juices! Please, try again!";
  let color = "error";

  let orderStore = useOrderStore();
  const customer = useAuthStore().loggedUser;

  const order = {
    customer_id: customer.id,
    vendor_id: vendor_id,
    host: host,
    quantity: juiceData.quantity,
    products: juiceSelections,
    withdraw_day: juiceData.date,
    withdraw_time: juiceData.time,
    total_value: totalPrice.value,
  };

  let response = await orderStore.createOrder(order);

  if (response.status) {
    message = `Wow! Your juices are on the way! See your Orders to get your code!`;
    color = "success";
    dialog.value = false;
  }

  const snackbarStore = useSnackbarStore();
  snackbarStore.showSnackbar({
    message: message,
    color: color,
  });
};

watch(
  () => juiceSelections,
  (newSelections) => {
    newSelections.forEach((selection, index) => {
      if (selection._id) {
        const selectedJuice = vendors.value[vendorIndex.value]?.recipes.find(
          (recipe) => {
            return recipe._id === selection._id;
          }
        );
        if (selectedJuice) {
          juiceSelections[index].name = selectedJuice.name;
        }
      }
    });
  },
  { deep: true }
);

watch(
  () => juiceData.quantity,
  (newQuantity, oldQuantity) => {
    if (newQuantity > oldQuantity && newQuantity > 0) {
      for (let i = oldQuantity; i < newQuantity; i++) {
        juiceSelections.push({
          name: null,
          ice: false,
          sugar: false,
        });
      }
    } else if (newQuantity < oldQuantity) {
      juiceSelections.splice(newQuantity);
    }
  }
);

onBeforeMount(loadVendors);
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto" v-if="!vendors.value">
        <v-card
          v-for="(vendor, index) in vendors"
          :key="index"
          class="card-background"
          width="420px"
        >
          <v-card-item>
            <div class="text-h6 mb-1">iJuice: {{ vendor.location }}</div>
            <div class="text-caption">
              <v-carousel height="250" cycle hide-delimiters>
                <span class="text-subtitle-1">Discover our flavors!</span>
                <v-carousel-item v-for="(recipe, i) in vendor.recipes" :key="i">
                  <v-sheet color="transparent" height="100%">
                    <v-row align-content="center" justify="center">
                      <v-col class="align-center mt-10">
                        <h1>{{ recipe.name }}</h1>
                        <span class="text-h6">What are the ingredients?</span>
                        <br />
                        <v-chip
                          color="grey-darken-4"
                          label
                          class="mt-4 mr-2 text-capitalize"
                          v-for="(ingredient, i) in recipe.ingredients"
                          :key="i"
                        >
                          {{ ingredient }}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </div>
          </v-card-item>
          <v-card-item>
            <v-btn color="brown-darken-2" @click="openDialog(index)">
              Order here!
            </v-btn>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col
        v-else
        cols="12"
        class="v-col-else d-flex flex-column align-center justify-center"
      >
        <p class="text-center">
          <v-icon size="100px">mdi-fridge-off</v-icon>
        </p>
        <h1 class="text-center">
          Hmm! Looks like we made a lot of juice today!
        </h1>
        <h1 class="text-center">Try again in a few minutes.</h1>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500">
      <v-card color="blue-grey-lighten-5">
        <v-card-title class="text-center">Let's drink!</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="juiceData.name"
              label="Name"
              variant="outlined"
              readonly
            ></v-text-field>
            <v-text-field
              v-model="juiceData.quantity"
              label="Quantity"
              type="number"
              variant="outlined"
              min="0"
              :rules="[validator.isRequired]"
            ></v-text-field>

            <div v-for="(selection, index) in juiceSelections" :key="index">
              <v-select
                v-model="selection._id"
                :items="vendors[vendorIndex]?.recipes"
                item-title="name"
                item-value="_id"
                label="Juice"
                variant="outlined"
                chips
                :rules="[validator.isSelected]"
              ></v-select>
              <v-row>
                <v-col>
                  <v-checkbox
                    v-model="selection.ice"
                    label="With Ice"
                  ></v-checkbox>
                </v-col>
                <v-col>
                  <v-checkbox
                    v-model="selection.sugar"
                    label="With Sugar"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </div>

            <v-text-field
              v-model="juiceData.date"
              label="Withdraw Date"
              type="date"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="juiceData.time"
              label="Withdraw Time"
              type="time"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="totalPrice"
              prefix="$"
              label="Total Price"
              variant="outlined"
              readonly
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" variant="tonal" @click="dialog = false"
            >Close</v-btn
          >
          <v-btn
            color="light-green-darken-4"
            variant="tonal"
            @click="
              orderMyJuice(
                vendors[vendorIndex]?._id,
                vendors[vendorIndex]?.host
              )
            "
            >Order my Juice</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.text-color {
  color: black;
}
.card-background {
  background: rgb(255, 84, 0);
  background: linear-gradient(
    219deg,
    rgba(255, 84, 0, 1) 0%,
    rgba(255, 188, 89, 1) 100%
  );
}
.v-col-else {
  height: 100vh !important;
  align-content: center !important;
}
</style>
