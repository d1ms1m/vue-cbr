<template>
    <div id="app" class="ui equal width grid">
        <div class="ui attached stackable menu">
            <div class="ui container">
                <router-link :to="{ name: 'task' }">
                    <a class="item">
                        <i class="tasks icon"></i> Task
                    </a>
                </router-link>
                <router-link :to="{ name: 'solution' }">
                    <a class="item">
                        <i class="tree icon"></i> Solution
                    </a>
                </router-link>
            </div>
        </div>

        <div class="ui container area">
            <div class="ui segment">
                <div class="ui divided items">
                    <div class="item">
                        <div class="ui small image">
                            <a href="mailto:dimsim@mail.ru" target="_blank">
                                <img id="logo" class="ui small circular image" src="@/assets/dimsim_logo.png">
                            </a>
                        </div>
                        <div class="middle aligned content">
                            <h1 class="ui header">Welcome to <a href="mailto:dimsim@mail.ru">dimsim's</a> test vue project</h1>
                        </div>
                    </div>
                    <div class="item">
                        <router-view/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    html {
        min-height: 100%;
    }

    #logo:hover {
         transform: scale(1.03);
    }

    .ui.menu > .container {
        margin: 1rem auto 0 auto;
    }

    .ui.grid > * {
        padding: 0;
    }

    a {
        color: black;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }

    .area {
        margin-top: 1.25rem;
    }

    .router-link-exact-active {
        background-color: whitesmoke;
    }
</style>
