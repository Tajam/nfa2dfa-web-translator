window.addEventListener('load', () => {
  let vm = new Vue({
    el: "#vue",
    data: {
      members: [
        {
          name: "Oo Jin Heng",
          id: "1161303917",
          role: "Leader"
        },
        {
          name: "Ong Jia Jun",
          id: "1161201687",
          role: "Member"
        },
        {
          name: "Kang Shu Ern",
          id: "1151205225",
          role: "Member"
        }
      ],
      machine: {
        nfae: new Machine("a", "__"),
        nfa: undefined,
        dfa: undefined,
        dfam: undefined
      }
    },
    methods: {
      addState: () => {
        let count = vm.machine.nfae.states.size;
        vm.machine.nfae.addState(numberToAlphabet(count));
        vm.$forceUpdate();
      },
      removeState: () => {
        let count = vm.machine.nfae.states.size - 1;
        if (count <= 0) return;
        vm.machine.nfae.removeState(numberToAlphabet(count));
        vm.$forceUpdate();
      },
      addAlphabet: () => {
        let count = vm.machine.nfae.alphabets.length - 1;
        vm.machine.nfae.addAlphabet(count.toString());
      },
      removeAlphabet: () => {
        let count = vm.machine.nfae.alphabets.length - 2;
        if (count < 0) return;
        vm.machine.nfae.removeAlphabet(count.toString());
      },
      addTransition: (state, alphabet, destination) => {
        state.addTransition(alphabet, destination);
        vm.$forceUpdate();
      },
      removeTransition: (state, alphabet, destination) => {
        state.removeTransition(alphabet, destination);
        vm.$forceUpdate();
      },
      setStartState(state) {
        vm.machine.nfae.setStartState(state.name);
        vm.$forceUpdate();
      },
      addFinalState(state) {
        vm.machine.nfae.addFinalState(state.name);
        vm.$forceUpdate();
      },
      removeFinalState(state) {
        vm.machine.nfae.removeFinalState(state.name);
        vm.$forceUpdate();
      }
    },
    computed: {

    }
  });
});