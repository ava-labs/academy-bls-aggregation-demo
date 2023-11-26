<template>
  <div class="flex flex-auto space-x-6">
    <div class="flex-auto">
      <label for="publicKeyA" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">🔑 Public Key</label>
      <div class="relative">
        <textarea id="publicKeyA" rows="4"
          class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500"
          v-model="publicKeyA">
                                                                                                          </textarea>
        <button
          class="text-white absolute right-2.5 top-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
          @click="this.pastePublicKeyA">
          Paste
        </button>
      </div>
    </div>

    <div class="flex-auto">
      <label for="publicKeyB" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">🔑 Public Key</label>
      <div class="relative">
        <textarea id="publicKeyB" rows="4"
          class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500"
          v-model="publicKeyB"> </textarea>
        <button
          class="text-white absolute right-2.5 top-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
          @click="this.pastePublicKeyB">
          Paste
        </button>
      </div>
    </div>

  </div>

  <mainButton @click="aggregateKeys" title="Aggregate Public Keys" />

  <div class="mb-5" v-if="this.keyDisplay">
    <label for="aggregatedPublicKey" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Aggregated
      Public Key</label>
    <div class="relative">
      <textarea id="aggregatedPublicKey" rows="4"
        class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500"
        :value="this.aggregatedKey">
                                                                        </textarea>
      <button
        class="text-white absolute right-2.5 top-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
        @click="this.copyAggregatedKey">
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
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "AggregateKeyView",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      publicKeyA: "",
      publicKeyB: "",
      aggregatedKey: "",
      keyDisplay: false,
    };
  },

  components: {
    mainButton,
  },
  methods: {

    async pastePublicKeyA() {
      this.publicKeyA = await navigator.clipboard.readText();
      this.toast.success("Pasted Public Key");
    },

    async pastePublicKeyB() {
      this.publicKeyB = await navigator.clipboard.readText();
      this.toast.success("Pasted Public Key");
    },

    async aggregateKeys() {
      if (this.publicKeyA == "" || this.publicKeyA == null || this.publicKeyB == "" || this.publicKeyB == null) {
        this.toast.error("Invalid Message: Please enter valid Public Keys");
        return;
      }

      var keyArray = [this.publicKeyA, this.publicKeyB];

      try {
        var hexAggregateKey = await helpers.aggKey(keyArray);
        this.aggregatedKey = await helpers.bufferToHex(hexAggregateKey);
      } catch (error) {
        this.toast.error("Error aggregating keys: " + error.message);
        return;
      }

      this.toast.success("Keys aggregated successfully");
      this.keyDisplay = true;
    },

    copyAggregatedKey() {
      navigator.clipboard.writeText(this.aggregatedKey);
      this.toast.success("Copied Public Key to Clipboard");
    },
  },
});
</script>
