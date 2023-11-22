<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl">Aggregating a Signature</h1>
    <p>Let's get our hands dirty and aggregate a signature. For this, we'll take the following steps:</p>
    <ul class="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
      <li>
        <span class="font-bold">Generate Key:</span> We will generate two key pairs (public & private key).
      </li>
      <li>
        At least one lowercase character
      </li>
      <li>
        Inclusion of at least one special character, e.g., ! @ # ?
      </li>
    </ul>

    <TitleCard title="Generate Keys" />
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
