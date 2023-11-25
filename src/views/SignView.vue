<template>
  <div>
    <div class="flex flex-col space-y-3 mb-5 relative">
      <label for="private-key" class="block text-xl font-medium text-gray-900 dark:text-white">
        Secret Key
      </label>
      <div class="relative">
        <input v-model="privKey" type="text" id="private-key"
          class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-lg focus:ring-red-500 focus:border-red-500">
        <button
          class="text-white absolute right-2.5 top-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
          @click="this.pastePrivateKey">
          Paste
        </button>
      </div>

      <p class="text-sm text-red-500" v-if="privKey && privKey?.length !== 64"><span class="font-medium">This doesn't look
          right!</span> Please make sure that the Private key has the correct format
      </p>
    </div>

    <div class="flex flex-col space-y-3 mb-5 relative">
      <label for="message" class="block text-xl font-medium text-gray-900 dark:text-white">Your message</label>
      <div class="relative">
        <textarea id="message" v-model="message" rows="4"
          class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 "
          placeholder="Write your message here...">
                          </textarea>
        <button
          class="text-white absolute right-2.5 top-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
          @click="this.copyMessage">
          Copy
        </button>
      </div>
    </div>


    <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
      <mainButton disabled="!privKey" @click="signMessage" title="✍️ Sign" />
    </div>

    <div class="mb-5" v-if="this.signed">
      <label for="signature" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Signature</label>
      <div class="relative">
        <textarea id="siganture" rows="4"
          class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500"
          :value="this.signature">
                                  </textarea>
        <button
          class="text-white absolute right-2.5 top-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
          @click="this.copySignature">
          Copy
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import mainButton from "@/components/mainButton.vue";
import helpers from "@/helperFunctions/helperFunctions.js";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "SignView",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      signed: false,
      message: "",
      signature: "",
      privKey: "",
    };
  },
  methods: {
    async signMessage() {
      if (!this.message) {
        this.toast.error("Enter a message to sign");
        return;
      }
      try {
        var bufferSignature = await helpers.signMessage(
          this.privKey,
          this.message
        );
      } catch (error) {
        this.toast.error("Error signing message: " + error.message);
        return;
      }
      this.signature = helpers.bufferToHex(bufferSignature);
      this.signed = true;
      this.toast.success("Message signed successfully");

      await this.$nextTick();
    },

    async pastePrivateKey() {
      this.privKey = await navigator.clipboard.readText();
      this.toast.success("Pasted Private Key");
    },

    copySignature() {
      navigator.clipboard.writeText(this.signature);
      this.toast.success("Copied Public Key to Clipboard");
    },

    copyMessage() {
      navigator.clipboard.writeText(this.message);
      this.toast.success("Copied Message to Clipboard");
    },
  },

  components: {
    mainButton,
  },
});
</script>
