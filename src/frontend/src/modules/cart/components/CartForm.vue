<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>
        <select
          name="test"
          class="select"
          @change="changeType"
          v-model="typeDelivery"
        >
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option value="3">Дом</option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          :value="user.phone"
          required
        />
      </label>

      <div class="cart-form__address" v-if="typeDelivery !== '1'">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              v-model="address.street"
              required
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              v-model="address.building"
              required
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="apartment" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartForm",

  data() {
    return {
      typeDelivery: "1",
      address: {
        street: "",
        building: "",
        flat: "",
      },
    };
  },
  computed: {
    ...mapGetters("Auth", ["user"]),
  },
  methods: {
    changeType(event) {
      console.log(event.target.value);
    },
  },
};
</script>
