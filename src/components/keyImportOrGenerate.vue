<template>
  <div class="flex flex-wrap flex-row justify-center gap-1 pb-5 mx-10">
    <mainButton v-if="!privKey" @click="generateKey" title="🔑 Generate Keys" />
  </div>

  <div v-if="this.signed" class="flex justify-center text-2xl pb-2">Signature</div>
  <TextDisplay class="mb-6" :displayText=this.pubKey>
    <template #Preload>
      <p>Public Key:</p>
    </template>
  </TextDisplay>
</template>
  
<script>
import { defineComponent } from "vue";
import helpers from '@/helperFunctions/helperFunctions.js'


// Components
import mainButton from "@/components/mainButton";
import TextDisplay from "./TextDisplay";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "keyImportOrGenerate",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      keysPresent: false,
      privKey: "",
      pubKey: "",
      keyOutput: {
        publicKey: "",
        privateKey: "",
      },
      keysGenerated: false
    };
  },
  methods: {

    generateKey() {
      // Generate Randomness and convert into BLS key
      var array = new Uint8Array(32);
      var privateKey = crypto.getRandomValues(array);
      this.pubKey = helpers.bufferToHex(helpers.generatePubKey(privateKey));
      this.privKey = helpers.bufferToHex(privateKey);

      this.keyOutput = {
        publicKey: this.pubKey,
        privateKey: this.privKey
      };


      this.$emit('pubKey', this.pubKey)
      this.$emit('privKey', this.privKey)

      this.keysGenerated = true
      this.keysPresent = true
      this.$emit('keysPresentStatus', this.keysPresent)
    },

    saveFile() {
      helpers.saveFile(JSON.stringify(this.keyOutput));
      this.toast.success("Saved Keypair");
    },

  },

  components: {
    mainButton,
    TextDisplay
  },
});
</script>