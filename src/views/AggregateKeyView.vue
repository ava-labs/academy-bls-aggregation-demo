<template>
  <TitleCard title="Aggregate Keys" />
  <div class="flex justify-center text-4xl pb-2">Keys</div>

  <div class="flex justify-center mb-4">
    <EditableArea
      v-model="message"
      :noHTML="false"
      placeholderValue="Enter keys separated by commas like: addf63...b5dcac,b91413...664e9a"
      class="h-52 overflow-auto w-4/5 break-words border-2 rounded-xl border-red-400 text-2xl p-8 xl:w-3/5"
    ></EditableArea>
  </div>

  <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
    <mainButton @click="aggregateKeys" title="Aggregate Keys" />
  </div>

  <div class="mb-5" v-if="keyDisplay">
    <div class="flex justify-center text-4xl pb-2">Aggregated Key</div>
    <TextDisplay :displayText="this.aggregatedKey" />
    <mainButton @click="this.copyAggregatedKey" title="Copy" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import TitleCard from "@/components/TitleCard.vue";
import mainButton from "@/components/mainButton.vue";
import TextDisplay from "@/components/TextDisplay.vue";
import EditableArea from "@/components/EditableArea.vue";
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
      aggregatedKey: "",
      keyDisplay: false,
      message: "",
    };
  },

  components: {
    TitleCard,
    mainButton,
    EditableArea,
    TextDisplay,
  },
  methods: {

    async aggregateKeys() {
      if (this.message == "" || this.message == null) {
        this.toast.error("Invalid Message: Please enter valid message");
        return;
      }

      var keyArray = this.message.split(",");

      try {
        var hexAggregateKey = await helpers.aggKey(keyArray);
        this.aggregatedKey = await helpers.bufferToHex(hexAggregateKey);
      } catch (error) {
        this.toast.error("Error aggregating keys: " + error.message);
        return;
      }

      this.toast.success("Keys aggregated successfully");
      this.keyDisplay = true;

      await this.$nextTick();
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    },

    copyAggregatedKey() {
      navigator.clipboard.writeText(this.aggregatedKey);
      this.toast.success("Copied Public Key to Clipboard");
    },
  },
});
</script>
