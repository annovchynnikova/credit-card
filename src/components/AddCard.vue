<template>
  <div class="main-add">
    <h1 class="pay-card-ttl">{{msg}}</h1>
    <div class="block-add-card">
      <form class="form-add-card" action>
        <label class="label-n-card" for="number-card">Номер карты</label>
        <!-- <input class="number-card" placeholder="Номер карты"  /> -->
        <!-- <the-mask class="number-card" placeholder="Номер карты"  v-mask="['####/####/####/####']" /> -->
        <div class="wrapNum">
          <input-mask
            class="number-card"
            placeholder="Номер карты"
            mask="9999 9999 9999 9999"
            maskChar=" "
            v-model="cardNum"
            @blur="/*inputValidate('cardNumber')*/"
            @focus="numErrorMsg = ''"
            @input="checkNameCard"
            ref="num"
          />

          <div v-if="photoVisa" class="photo-visa"></div>
          <div v-else-if="photoMaster" class="photo-master"></div>

          <div v-if="numErrorMsg" class="invalid-error">{{numErrorMsg}}</div>
        </div>
        <div class="date-and-cvv">
          <div class="wrapDate">
            <input-mask
              class="date-card"
              placeholder="Срок действия"
              mask="99/99"
              maskChar=" "
              v-model="cardDate"
              @blur="/*inputValidate('cardDate')*/"
              @focus="dateErrorMsg = ''"
              ref="date"
            />
            <div v-if="dateErrorMsg" class="invalid-error">{{dateErrorMsg}}</div>
          </div>
          <div class="wrapCvv">
            <input
              class="cvv-card"
              placeholder="CVС код"
              type="password"
              maxlength="3"
              v-model="cardCvv"
              @input="onlyNum"
              @blur="/*inputValidate('cardCvv')*/"
              @focus="cvvErrorMsg = ''"
            />
            <div v-if="cvvErrorMsg" class="invalid-error">{{cvvErrorMsg}}</div>
          </div>
        </div>
        <p
          class="text-for-add"
        >Для привязки карты мы проведем платеж в размере 1.00 UAH, который будет возвращен в течение 30 минут</p>
        <button
          :class="{'preloader-wrap': validForm}"
          class="button-add-card"
          @click.prevent="btnClick"
        >Получить деньги</button>
      </form>
    </div>
  </div>
</template>

<script>
// import {TheMask} from 'vue-the-mask'

export default {
  name: "card",
  data() {
    return {
      msg: "Добавление платежной карты",
      photoVisa: false,
      photoMaster: false,
      validForm: false,
      cardNum: "",
      cardDate: "",
      cardCvv: "",
      numErrorMsg: "",
      dateErrorMsg: "",
      cvvErrorMsg: "",
    };
  },
  methods: {
    onlyNum(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, "");
    },
    inputValidate(name) {
      if (name === "cardNumber") {
        let valid = this.luhnAlgorithm();
        if (!valid) {
          this.numErrorMsg =
            this.cardNum === ""
              ? "* Обязательное поле"
              : "* Некорректный номер карты";
        } else {
          this.numErrorMsg = "";
        }
      } else if (name === "cardDate") {
        let valid = this.checkDate();
        if (!valid) {
          this.dateErrorMsg =
            this.cardDate === ""
              ? "* Обязательное поле"
              : "* Некорректна дата";
        } else {
          this.dateErrorMsg = "";
        }
      } else if (name === "cardCvv") {
        if (this.cardCvv.length < 3) {
          this.cvvErrorMsg =
            this.cardCvv === ""
              ? "* Обязательное поле"
              : "* Некорректный номер cvv";
        }
      }
    },
    luhnAlgorithm() {
      let sum = 0;
      let cardNum = this.cardNum.replace(/\s/g, "");
      if (cardNum.length < 16) return false;
      for (let i = 0; i < cardNum.length; i++) {
        let num = parseInt(cardNum[i]);
        if ((cardNum.length - i) % 2 === 0) {
          num = num * 2;
          if (num > 9) {
            num = num - 9;
          }
        }
        sum += num;
      }
      return sum % 10 === 0;
    },
    checkDate() {
      if (this.cardDate.replace("/", "").replace(" ", "").length < 4)
        return false;

      let currentDate = new Date();
      let currentMonth = currentDate.getMonth();
      let currentYear = currentDate.getFullYear(2016);
      let expireMonth = parseInt(this.cardDate.split("/")[0]);
      let expireYear = parseInt("20" + this.cardDate.split("/")[1]);

      if (
        (currentYear < expireYear && expireMonth < 13) ||
        (currentYear == expireYear &&
          currentMonth < expireMonth &&
          expireMonth < 13)
      ) {
        return true;
      } else {
        return false;
      }
    },
    checkNameCard() {
      if (this.cardNum[0] == 4) {
        this.photoVisa = true;
        this.photoMaster = false;
      } else if (
        this.cardNum[0] + this.cardNum[1] >= 51 &&
        this.cardNum[0] + this.cardNum[1] <= 55
      ) {
        this.photoMaster = true;
        this.photoVisa = false;
      } else {
        this.photoMaster = false;
        this.photoVisa = false;
      }
    },
    btnClick() {
      let valid = true;

      this.inputValidate("cardNumber");
      this.inputValidate("cardDate");
      this.inputValidate("cardCvv");

      if (
        this.cardNum === "" ||
        this.cardDate === "" ||
        this.cardCvv === "" ||
        this.numErrorMsg ||
        this.dateErrorMsg ||
        this.cvvErrorMsg
      ) {
        valid = false;
      }

      if (valid) {
        this.validForm = valid;
        setTimeout(() => {
          this.validForm = false;
          this.cardNum = "";
          this.cardDate = "";
          this.cardCvv = "";
          alert("Форма успешно отправлена");
          window.location.reload();
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.main-add {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
}
.pay-card-ttl {
  font-family: "PT Sans", sans-serif;
  font-size: 32px;
  line-height: 1.2em;
  color: #756868;
  padding-top: 80px;
  padding-bottom: 28px;
  font-weight: normal;
}
.block-add-card {
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 4px;
  max-width: 960px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.form-add-card {
  padding-top: 49px;
  max-width: 404px;
  padding-bottom: 49px;
}
/* .focused{
   border: 1px solid gray;
 } */
.label-n-card {
  font-family: "PT Sans", sans-serif;
  font-size: 18px;
  line-height: 1.2em;
  color: #000000;
  font-weight: 600;
}
.text-for-add {
  font-family: "PT Sans", sans-serif;
  font-size: 16px;
  line-height: 1.2em;
  color: #808080;
  margin: 30px 0;
  /* padding-top: 30px; */

  /* width: 350px; */
}

.photo-visa {
  position: absolute;
  background-image: url(../assets/img/visa.png);
  width: 60px;
  height: 40px;
  background-size: cover;
  background-position: center;
}
.photo-master {
  position: absolute;
  background-image: url(../assets/img/master.png);
  width: 60px;
  height: 40px;
  background-size: cover;
  background-position: center;
}
input {
  padding-left: 16px;
  font-weight: 500;
  margin-bottom: 7px;
}
input,
button {
  width: 386px;
  height: 56px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  margin-top: 17px;
  font-size: 16px;
  line-height: 1.2em;
  outline: none;
}

.date-card,
.cvv-card {
  width: 178px;
}
/* .cvv-card{
  -webkit-text-security: circle;
} */

.date-and-cvv {
  display: flex;
  justify-content: space-between;
}
.button-add-card {
  background: linear-gradient(
    122.5deg,
    #5a4be6 -33.07%,
    #73aff7 48.35%,
    #93d0d9 139.94%
  );
  color: #ffffff;
  font-family: "PT Sans", sans-serif;
  text-align: center;
  border: none;
  margin: 0;
  width: 404px;
  font-weight: 600;
  cursor: pointer;
}
.invalid-error {
  color: #ff8d8d;
  position: absolute;
  bottom: -15px;
  right: 2px;
}
.wrapNum,
.wrapDate,
.wrapCvv {
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
}

.wrapNum {
  position: relative;
}

.photo-visa,
.photo-master {
  right: 10px;
  bottom: 15px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #808080;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #808080;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #808080;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #808080;
}

input:focus {
  border: 1px solid #808080;
  -webkit-transition: all 100ms cubic-bezier(0.42, 0, 0.58, 1);
  -moz-transition: all 100ms cubic-bezier(0.42, 0, 0.58, 1);
  -o-transition: all 100ms cubic-bezier(0.42, 0, 0.58, 1);
  transition: all 100ms cubic-bezier(0.42, 0, 0.58, 1);
}

input::-webkit-input-placeholder {
  opacity: 1;
  transition: opacity 0.5s ease;
}

input::-moz-placeholder {
  opacity: 1;
  transition: opacity 0.5s ease;
}

input:-moz-placeholder {
  opacity: 1;
  transition: opacity 0.5s ease;
}

input:-ms-input-placeholder {
  opacity: 1;
  transition: opacity 0.5s ease;
}

input:focus::-webkit-input-placeholder {
  opacity: 0;
  transition: opacity 0.5s ease;
}

input:focus::-moz-placeholder {
  opacity: 0;
  transition: opacity 0.5s ease;
}

input:focus:-moz-placeholder {
  opacity: 0;
  transition: opacity 0.5s ease;
}

input:focus:-ms-input-placeholder {
  opacity: 0;
  transition: opacity 0.5s ease;
}

/*MEDIA*/
@media screen and (max-width: 630px) {
  .pay-card-ttl {
    font-size: 26px;
    padding: 30px 0;
  }

  .block-add-card {
    width: auto;
    padding: 20px;
  }

  .label-n-card {
    display: none;
  }

  .form-add-card {
    padding: 0;
  }
}

@media screen and (max-width: 500px) {
  .button-add-card {
    width: 100%;
    margin: 0;
  }

  .form-add-card {
    width: 100%;
  }

  .pay-card-ttl {
    text-align: center;
  }

  .number-card {
    margin-top: 0;
  }

  .main-add {
    display: block;
    margin: 0 15px;
  }

  /* .date-card,
  .cvv-card {
    width: auto;
    max-width: 144px;
  } */

  .text-for-add {
    width: auto;
    padding: 0;
    margin: 26px 0;
  }

  .number-card {
    width: calc(100% - 18px);
  }

  .wrapNum {
    width: auto;
    display: block;
  }
}

@media screen and (max-width: 475px) {
  .wrapDate,
  .wrapCvv {
    max-width: 160px;
  }

  .date-card,
  .cvv-card {
    width: auto;
  }
}

@media screen and (max-width: 400px) {
  .wrapDate,
  .wrapCvv {
    max-width: 148px;
  }
  .pay-card-ttl {
    font-weight: normal;
    padding: 18px 46px;
  }
  .invalid-error {
    font-size: 12px;
  }
}
</style>