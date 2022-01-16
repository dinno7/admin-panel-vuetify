<template>
  <v-container>
    <v-row>
      <v-col v-for="card in cards" :key="card.id" cols="12" sm="6" lg="3">
        <v-card class="top-cards" dark :color="card.color" flat>
          <v-card-title class="d-flex px-5">
            <span>{{ card.title }}</span>
            <v-spacer></v-spacer>
            <div>
              <span class="subtitle-1 mx-4">{{ card.text }}</span>
            </div>
            <v-icon>mdi-{{ card.icon }}</v-icon>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="mt-4" />

    <!-- //----------------------------------------------- -->
    <v-row class="mt-3">
      <v-col>
        <v-card flat>
          <p
            class="font-weight-medium pa-4"
            :class="$vuetify.breakpoint.mdAndUp ? 'text-h4' : 'text-h5'"
          >
            نمودار
          </p>

          <v-card-title
            style="
              position: relative;
              background: rgba(94, 93, 93, 0.034);
              min-width: max-content;
            "
            :style="
              $vuetify.breakpoint.mdAndUp
                ? 'min-height: 370px'
                : 'min-height: 150px;'
            "
          >
            <v-sparkline
              v-for="item in ['#F55549', '#5DB661', '#36A0F4', '#5161BC']"
              :key="item"
              :color="item"
              height="120"
              :value="[
                0,
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
              ]"
              style="position: absolute; width: 100%"
              line-width="2"
              padding="15"
              smooth="20"
              auto-draw
            ></v-sparkline>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="mt-5"></v-divider>
    <!-- //----------------------------------------------- -->
    <p class="text-h4 mt-9 py-3 font-weight-medium">کاربران سایت</p>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          outlined
          label="جستوجو کنید..."
          placeholder="مقدار مورد نظر را وارد کنید"
          append-icon="mdi-magnify"
          hide-details
          flat
          clearable
        ></v-text-field>
      </v-card-title>

      <v-dialog v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
          <div class="mx-4">
            <v-btn
              width="100%"
              depressed
              color="primary"
              v-on="on"
              v-bind="attrs"
              >افزودن کاربر جدید
              <v-icon class="mx-4"> mdi-account-plus</v-icon></v-btn
            >
          </div>
        </template>

        <v-card>
          <v-card-title>فرم افزودن کاربر جدید</v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="addUserForm" @submit.prevent="addUserToTable">
                <v-row justify="center" align="center">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      :rules="[(value) => !!value || 'باید مقداری وارد کنید']"
                      required
                      outlined
                      label="نام و نام خانوادگی"
                      v-model="userForm.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="[
                        18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                        32, 33, 34, 35, 36, 37, 38, 39, 40,
                      ]"
                      v-model="userForm.age"
                      label="سن"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      :rules="[(value) => !!value || 'باید مقداری وارد کنید']"
                      type="email"
                      outlined
                      label="ایمیل"
                      v-model="userForm.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="d-flex justify-space-between">
                      <v-file-input
                        :rules="[
                          (value) =>
                            !value ||
                            value.size < 2000000 ||
                            'حجم عکس نباید بیشتر از 2 مگابایت باشد!',
                        ]"
                        outlined
                        prepend-icon="mdi-camera"
                        accept="image/png, image/jpeg, image/bmp"
                        show-size
                        label="آواتار"
                        style="max-width: 250px"
                      ></v-file-input>
                      <v-radio-group row v-model="userForm.gen">
                        <v-radio
                          v-for="gen in ['مرد', 'زن']"
                          :key="gen"
                          :label="gen"
                          :value="gen"
                        >
                        </v-radio>
                      </v-radio-group>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <v-btn type="submit" dark color="indigo" depressed
                      >افزودن</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-data-table
        no-data-text="کاربری وجود ندارد"
        no-results-text="موردی یافت نشد!"
        :footer-props="{ 'items-per-page-text': 'ردیف در هر صفحه:' }"
        :headers="headers"
        :items="users"
        :search="search"
      >
        <template v-slot:item.gen="{ item }">
          <v-chip :color="getColor(item.gen)" dark>
            {{ item.gen }}
          </v-chip>
        </template>

        <template v-slot:item.avatar="{ item }">
          <v-chip style="background: transparent">
            <v-img
              :src="item.avatar"
              class="rounded-circle"
              :width="$vuetify.breakpoint.mdAndUp ? 35 : 40"
            />
          </v-chip>
        </template>

        <template v-slot:footer.page-text="{ pageStart, pageStop, itemsLength }"
          >{{ pageStart }} تا {{ pageStop }} از {{ itemsLength }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn @click="deleteUser(item.id)" color="error" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
import users from "@/components/users.js";
export default {
  name: "Home",
  data() {
    return {
      // --------------------------
      cards: [
        { title: "پست ها", icon: "post", color: "red", text: "27 عدد", id: 1 },
        {
          title: "کاربران",
          icon: "account-group",
          color: "blue",
          text: "753 نفر",
          id: 2,
        },
        {
          title: "سفارشات",
          icon: "cart",
          color: "indigo",
          text: "129 عدد",
          id: 3,
        },
        {
          title: "درآمد",
          icon: "credit-card",
          color: "green",
          text: "1,456,700 تومان",
          id: 4,
        },
      ],
      search: "",
      headers: [
        {
          text: "شناسه کاربری",
          align: "start",
          filterable: false,
          value: "id",
        },
        { text: "نام و نام خانوادگی", value: "name" },
        { text: "سن", value: "age" },
        { text: "جنسیت", value: "gen", align: "center", sortable: false },
        { text: "ایمیل", value: "email", align: "center" },
        {
          text: "آواتار",
          value: "avatar",
          filterable: false,
          sortable: false,
          align: "center",
        },
        { text: "عملیات", value: "actions", align: "center" },
      ],
      users,
      userForm: {
        name: "",
        age: null,
        gen: null,
        email: "",
        avatar: "https://via.placeholder.com/600/24f355",
      },
      radioGp: null,
      dialog: false,
    };
  },
  methods: {
    getColor(gen) {
      if (gen === "زن") return "indigo";
      else return "blue";
    },
    addUserToTable() {
      if (this.$refs.addUserForm.validate()) {
        let id = Math.round(Math.random() * 10 ** 7);
        this.users.push({ ...this.userForm, id });
        this.dialog = false;
        this.userForm.name = "";
        this.userForm.age = null;
        this.userForm.gen = null;
        this.userForm.email = "";
      }
    },
    deleteUser(id) {
      let targetIndex =
        users.findIndex((u) => Number(u.id) === Number(id)) !== -1
          ? users.findIndex((u) => Number(u.id) === Number(id))
          : "";
      users.splice(targetIndex, 1);
    },
  },

  mounted() {
    if (this.$vuetify.breakpoint.xs) {
      document.querySelector(
        ".v-data-table-header-mobile__wrapper .v-label"
      ).textContent = "ترتیب ";
    }
  },
};
</script>
<style lang="scss" scoped>
.top-cards {
  user-select: none;
  &:hover {
    opacity: 0.9;
  }
}
</style>
