<template>
  <div class="sign-form-container">
    <div class="sign-form">
      <button class="close close--white close--button" @click="$router.go(-1)">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </button>

      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>

      <form action="test.html" method="post">
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <input type="email" name="email" placeholder="example@mail.ru" />
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <input type="password" name="pass" placeholder="***********" />
          </label>
        </div>

        <button type="submit" class="button">Авторизоваться</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped>
.sign-form-container {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
}

.close--button {
  border: none;
  background: transparent;
  outline: none;
}
</style>
