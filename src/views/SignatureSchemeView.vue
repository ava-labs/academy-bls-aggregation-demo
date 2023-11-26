<template>
  <div class="bg-avalanche-red w-full py-12 mb-8 px-4">
    <h1 class="text-6xl max-w-4xl mx-auto text-white font-medium">Using a Signature Scheme</h1>
  </div>

  <div class="max-w-4xl mx-auto text-xl px-4">
    <div class="space-y-4">
      <p>Let's get our hands dirty and use a signature scheme. We'll take the following steps:</p>
      <ul class="space-y-2 list-disc list-inside">
        <li>
          <span class="font-bold">Generate Key Pair:</span> We will generate a key pair consisting of a Public and a
          Secret Key.
        </li>
        <li>
          <span class="font-bold">Sign Message:</span> We create a Signature by signing the Message with the Secret Key.
        </li>
        <li>
          <span class="font-bold">Verify Signature:</span> We verify the Signature of a Message with the Public Key.
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <TitleCard title="Generate Keys" />
      <p>Start by generating a Key Pair consisting of a Public and Secret Key.</p>
      <GenerateView />
    </div>

    <div class="space-y-4">
      <TitleCard title="Sign" />
      <p>Now use the generated Secret Key to sign a Message. Pick any message you want to sign, e.g. "Per consensum ad
        astra".</p>
      <SignView />
    </div>

    <div class="space-y-4">
      <TitleCard title="Verify" />
      <p>Anyone, that has access to your Public Key corresponding to the Private Key used for signing the message can now
        verify the signature of the Message. Therefore, the Authenticity, Non-Repudiation and Integrity of the Message can
        be trusted.</p>
      <VerifyView />
    </div>


    <!--AggregateKeyView /-->
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import TitleCard from "@/components/TitleCard.vue";

// Views
import GenerateView from "@/views/GenerateView.vue";
import SignView from "@/views/SignView.vue";
import VerifyView from "./VerifyView.vue";

export default defineComponent({
  name: "SignatureSchemeView",
  data() {
    return {
      msg: "Test"
    }
  },

  components: {
    GenerateView,
    SignView,
    VerifyView,
    TitleCard
  },
});
</script>
