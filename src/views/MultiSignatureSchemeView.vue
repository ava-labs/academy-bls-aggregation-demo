<template>
  <div class="bg-avalanche-red w-full py-12 mb-8 px-4">
    <h1 class="text-6xl max-w-4xl mx-auto text-white font-medium">Aggregating Signatures and Public Keys</h1>
  </div>

  <div class="max-w-4xl mx-auto text-xl px-4">
    <div class="space-y-4">
      <p>Let's explore the use of a Multi-Signature Scheme. We'll take the following steps:</p>
      <ul class="space-y-2 list-disc list-inside">
        <li>
          <span class="font-bold">Generate Two Key Pair:</span> We will generate two key pairs.
        </li>
        <li>
          <span class="font-bold">Sign Message:</span> We create two Signatures of the same Message with the two
          Secret Keys.
        </li>
        <li>
          <span class="font-bold">Aggregate Signatures:</span> We aggregate the two Signatures to a single Signature.
        </li>
        <li>
          <span class="font-bold">Aggregate Public Keys:</span> We aggregate the two Public Keys to a single Public Key.
        </li>
        <li>
          <span class="font-bold">Verify aggregated Signature:</span> We verify the Signature with the
          aggregated Public Key.
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <TitleCard title="Generate Keys" />
      <p>Start by generating two Key Pairs each consisting of a Public and Secret Key. In a real-world setting these key
        pairs would be created by independent actors, but for the sake of the exercise we will play multiple actors here.
      </p>
      <div class="flex flex-auto space-x-12">
        <GenerateView class="flex-auto" />
        <GenerateView class="flex-auto" />
      </div>
    </div>

    <div class="space-y-4">
      <TitleCard title="Sign" />
      <p>Now use the generated Secret Keys to sign a Message. Make sure to pick exactly the same Message for both
        Signatures, e.g. "Per consensum ad
        astra".</p>
      <div class="flex flex-auto space-x-12">
        <SignView class="flex-auto" />
        <SignView class="flex-auto" />
      </div>
    </div>

    <div class="space-y-4">
      <TitleCard title="Aggregate Signatures" />
      <p>We can now utilize the signature aggregation to create an aggregated Signature. In this exercise we are only
        aggregating two signatures, but we could do this with hundreds or thousands. Side fact: It does not matter in
        which order the signatures are aggrated.</p>
      <AggregateSigView />
    </div>

    <div class="space-y-4">
      <TitleCard title="Aggregate Public Keys" />
      <p>To verify an aggregated Signature, we need also need to aggregate the Public Keys that correspond to the Private
        Keys that were used to sign the message. Analogous to the signatures we can aggregate many more than just two
        Public Keys and also here the order does not matter.</p>
      <AggregateKeyView />
    </div>

    <div class="space-y-4">
      <TitleCard title="Verify" />
      <p>Anyone, that has access to the aggregated Public Key can now verify the signature of the Message. Therefore, they
        can
        ensure the Authenticity, Non-Repudiation and Integrity of the Message.</p>
      <VerifyView />
    </div>

    <div class="space-y-4">
      <TitleCard title="Conclusion" />
      <p>Congrats to going through the exercise and experiencing hands-on how we can utilize Siganture Aggregation. You
        will see in the next chapter about Avalanche Warp Messaging how Mutli-Signature schemes can enable secure and
        efficient cross-Subnet communication.</p>
    </div>

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
import AggregateKeyView from "./AggregateKeyView.vue";
import AggregateSigView from "./AggregateSigView.vue";

export default defineComponent({
  name: "MultiSignatureView",
  data() {
    return {
      msg: "Test"
    }
  },

  components: {
    GenerateView,
    SignView,
    VerifyView,
    TitleCard,
    AggregateKeyView,
    AggregateSigView
  },
});
</script>
