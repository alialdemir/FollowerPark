<template>
  <div class="new-pulse"></div>
</template>

<script>
export default {
  name: 'fp-new-pulse'
};
</script>

<style>
.new-pulse {
  position: relative;
}
.new-pulse::before {
  top: -5px;
  right: 10px;
  border-radius: 3px;
  line-height: 14px;
  font-size: 11px;
}
.new-pulse::before {
  z-index: 2;
  content: 'new';
  position: absolute;
  top: -3px;
  right: -40px;
  color: #fff;
  border-radius: 5px;
  background: #ffa900;
  cursor: pointer;
  box-shadow: 0 0 0 rgba(204, 169, 44, 0.4);
  animation: pulse-new 2s infinite;
  padding: 1px 5px;
  font-family: Arial;
  font-size: 12px;
  line-height: 16px;
}
@-webkit-keyframes pulse-new {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }

  70% {
    -webkit-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
  }

  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}

@keyframes pulse-new {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }

  70% {
    -moz-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
  }

  100% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}

@-webkit-keyframes pulse-new-beta {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(25, 171, 255, 0.4);
  }

  70% {
    -webkit-box-shadow: 0 0 0 10px rgba(25, 171, 255, 0);
  }

  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(25, 171, 255, 0);
  }
}

@keyframes pulse-new-beta {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(25, 171, 255, 0.4);
    box-shadow: 0 0 0 0 rgba(25, 171, 255, 0.4);
  }

  70% {
    -moz-box-shadow: 0 0 0 10px rgba(25, 171, 255, 0);
    box-shadow: 0 0 0 10px rgba(25, 171, 255, 0);
  }

  100% {
    -moz-box-shadow: 0 0 0 0 rgba(25, 171, 255, 0);
    box-shadow: 0 0 0 0 rgba(25, 171, 255, 0);
  }
}
</style>