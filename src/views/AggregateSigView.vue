<template>
  <div class="flex flex-auto space-x-6">
    <div class="flex-auto">
      <label for="signatureA" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Signature</label>
      <div class="relative">
        <textarea id="signatureA" rows="4"
          class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500"
          v-model="signatureA">
                                                                                              </textarea>
        <button
          class="text-white absolute right-2.5 top-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
          @click="this.pasteSignatureA">
          Paste
        </button>
      </div>
    </div>

    <div class="flex-auto">
      <label for="signatureB" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Signature</label>
      <div class="relative">
        <textarea id="sigantureB" rows="4"
          class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500"
          v-model="signatureB">
                                                                                                </textarea>
        <button
          class="text-white absolute right-2.5 top-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
          @click="this.pasteSignatureB">
          Paste
        </button>
      </div>
    </div>

  </div>

  <mainButton @click="aggregateSignatures" title="Aggregate Signatures" />

  <div class="mb-5" v-if="this.signatureDisplay">
    <label for="signature" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Aggregated
      Signature</label>
    <div class="relative">
      <textarea id="siganture" rows="4"
        class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500"
        :value="this.aggregatedSignature">
                                                            </textarea>
      <button
        class="text-white absolute right-2.5 top-2.5 bg-avalanche-red hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-4 py-2"
        @click="this.copyAggregatedSignature">
        Copy
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import mainButton from "@/components/mainButton.vue";
import helpers from '@/helperFunctions/helperFunctions.js'
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "AggregateSigView",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      signatureA: "",
      signatureB: "",
      aggregatedSignature: "",
      signatureDisplay: false,
    };
  },

  components: {
    mainButton
  },
  methods: {

    async pasteSignatureA() {
      this.signatureA = await navigator.clipboard.readText();
      this.toast.success("Pasted Signature");
    },

    async pasteSignatureB() {
      this.signatureB = await navigator.clipboard.readText();
      this.toast.success("Pasted Signature");
    },

    copyAggregatedSignature() {
      navigator.clipboard.writeText(this.aggregatedSignature);
      this.toast.success("Copied Aggregated Signature to Clipboard");
    },

    async aggregateSignatures() {

      if (this.signatureA == "" || this.signatureA == null || this.signatureB == "" || this.signatureB == null) {
        this.toast.error("Invalid Signatures: Please enter signatures to aggregate");
        return
      }
      var signatureArray = [this.signatureA, this.signatureB]
      try {

        var hexAggregateSignature = await helpers.aggSig(signatureArray)
        this.aggregatedSignature = await helpers.bufferToHex(hexAggregateSignature)

      } catch (error) {
        this.toast.error("Error aggregating signatures: " + error.message);
        return
      }

      this.toast.success("Signatures aggregated successfully");
      this.signatureDisplay = true
    }

  },
});
</script>
