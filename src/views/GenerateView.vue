<template>
  <div>
    <div class="flex flex-wrap flex-row justify-center gap-1 pb-5">
      <mainButton @click="generateKey" title="Generate Keys" />
    </div>

    <div class="mb-5 relative" v-if="publicKeyHex">
      <label for="public-key" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
        🔑 Public Key
      </label>
      <input :value="publicKeyHex" type="text" id="private-key"
        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-lg focus:ring-red-500 focus:border-red-500 "
        readonly>
      <button
        class="text-white absolute right-2.5 bottom-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
        @click="this.copyPublicKey">
        Copy
      </button>
      <!--p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">This doesn't look right!</span> Please make sure that the Private key has the correct format</p-->
    </div>



    <div class="mb-5 relative" v-if="privateKeyHex">
      <label for="private-key" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
        🗝️ Secret Key
      </label>
      <input :value="privateKeyHex" type="text" id="private-key"
        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-lg focus:ring-red-500 focus:border-red-500"
        readonly>
      <button
        class="text-white absolute right-2.5 bottom-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
        @click="this.copyPrivateKey">
        Copy
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import mainButton from "@/components/mainButton.vue";
import helpers from "@/helperFunctions/helperFunctions.js";

export default defineComponent({
  name: "GenerateView",
  data() {
    return {
      publicKeyHex: "",
      privateKeyHex: "",
      keyOutput: "",
      toggleCopy: false,
    };
  },

  methods: {
    generateKey() {
      // Generate Randomness and convert into BLS key
      var array = new Uint8Array(32);
      var privKey = crypto.getRandomValues(array);
      this.publicKeyHex = helpers.bufferToHex(helpers.generatePubKey(privKey));
      this.privateKeyHex = helpers.bufferToHex(privKey);
      this.keyOutput = {
        publicKey: this.publicKeyHex,
        privateKey: this.privateKeyHex,
      };
    },
    copyPublicKey() {
      navigator.clipboard.writeText(this.publicKeyHex);
    },
    copyPrivateKey() {
      navigator.clipboard.writeText(this.privateKeyHex);
    },
  },

  components: {
    mainButton,
  },

});
</script>
