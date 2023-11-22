<template>
  <div class="bg-avalanche-red w-full py-12 mb-8 px-4">
    <h1 class="text-6xl max-w-4xl mx-auto text-white font-medium">Signing a Message</h1>
  </div>

  <div class="max-w-4xl mx-auto text-xl space-y-4 px-4">
    <p>Let's get our hands dirty and use a signature scheme. We'll take the following steps:</p>
    <ul class="space-y-2 list-disc list-inside">
      <li>
        <span class="font-bold">Generate Key Pair:</span> We will generate a key pair consisting of a Public and a Secret
        Key.
      </li>
      <li>
        <span class="font-bold">Sign Message:</span> We create a Signature by signing the Message with the Secret Key.
      </li>
      <li>
        <span class="font-bold">Verify Signature:</span> We verify the Signature of a Message with the Public Key.
      </li>
    </ul>

    <TitleCard title="Generate Keys" class="pt-12" />

    <GenerateView />
    <!--div class="flex flex-auto space-x-12">
      <GenerateView class="flex-auto" />
      <GenerateView class="flex-auto" />
    </div-->

    <SignView />

    <VerifyView />


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
  name: "HomeView",
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
