<template>
  <div class="flex flex-col space-y-3 mb-5 relative">
    <label for="public-key" class="block text-xl font-medium text-gray-900 dark:text-white">
      🔑 Public Key
    </label>
    <div class="relative">
      <input v-model="pubKey" type="text" id="public-key"
        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-lg focus:ring-red-500 focus:border-red-500">
      <button
        class="text-white absolute right-2.5 top-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
        @click="this.pastePublicKey">
        Paste
      </button>
    </div>

    <p class="text-sm text-red-500" v-if="pubKey && pubKey?.length !== 96"><span class="font-medium">This doesn't look
        right!</span> Please make sure that the Public key has the correct format
    </p>
  </div>

  <div class="flex flex-col space-y-3 mb-5 relative">
    <label for="signature" class="block text-xl font-medium text-gray-900 dark:text-white">🖋️ Signature</label>
    <div class="relative">
      <textarea id="siganture" rows="4"
        class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500"
        v-model="signature">
                                                                                </textarea>
      <button
        class="text-white absolute right-2.5 top-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
        @click="this.pasteSignature">
        Paste
      </button>
    </div>
  </div>

  <div class="flex flex-col space-y-3 mb-5 relative">
    <label for="message" class="block text-xl font-medium text-gray-900 dark:text-white">📝 Message</label>
    <div class="relative">
      <textarea id="message" v-model="message" rows="4"
        class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 "
        placeholder="Write your message here...">
                                                                                </textarea>
      <button
        class="text-white absolute right-2.5 top-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
        @click="this.pasteMessage">
        Paste
      </button>
    </div>
  </div>

  <div v-if="signatureChecked">
    <div v-if="isValid"
      class="p-4 mb-4 text-xl text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
      <span class="font-medium">Signature valid!</span> The Signature of the Message was created with the Secret Key
      that corresponds to the provided Public Key.
    </div>
    <div v-if="!isValid" class="p-4 mb-4 text-xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert">
      <span class="font-medium">Signature invalid!</span> The Message, Signature and Public Key do not belong together.
    </div>
  </div>

  <mainButton @click="validate" class="mb-10 mt-6" title="Verify" />
</template>

<script>
import { defineComponent } from "vue";

// Components
import mainButton from "@/components/mainButton.vue";
import helpers from "@/helperFunctions/helperFunctions.js";
import { useToast } from "vue-toastification";
//import TextDisplay from "@/components/TextDisplay.vue";

export default defineComponent({
  name: "VerifyView",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      signatureChecked: false,
      isValid: false,
      message: "",
      signature: "",
      pubKey: "",
    };
  },

  components: {
    mainButton,
  },
  methods: {
    async pastePublicKey() {
      this.pubKey = await navigator.clipboard.readText();
      this.toast.success("Pasted Public Key");
    },

    async pasteMessage() {
      this.message = await navigator.clipboard.readText();
      this.toast.success("Pasted Message");
    },

    async pasteSignature() {
      this.signature = await navigator.clipboard.readText();
      this.toast.success("Pasted Signature");
    },

    async validate() {
      if (this.message && this.signature && this.pubKey) {
        try {
          this.isValid = await helpers.checkSig(
            this.signature,
            this.pubKey,
            this.message
          );
          this.toast.success("Signature validated");
        } catch (error) {
          this.isValid = false;
        }
        this.signatureChecked = true;
      } else {
        this.toast.error("Missing signature, public key or message");
      }
    },
  },
});
</script>
