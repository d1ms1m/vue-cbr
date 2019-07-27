<template>
    <div id="app" class="ui equal width grid">
        <div class="ui attached stackable menu">
            <div class="ui fluid container">
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

        <div class="column">
            <div class="">
            </div>
        </div>
        <div class="eight wide column">
            <div class="ui segment">
                <div class="ui divided items">
                    <div class="item">
                        <div class="ui small image">
                            <a href="https://cbr.ru" target="_blank">
                                <img id="logo" class="ui small circular image" src="@/assets/cbrf_logo.png">
                            </a>
                        </div>
                        <div class="middle aligned content">
                            <h1 class="ui header">Welcome to CBR's test project by Dmitry Simontsev</h1>
                        </div>
                    </div>
                    <div class="item">
                        <router-view/>
                    </div>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="">
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

    .container {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
        padding: 1.25rem;
        max-width: 1024px !important;
        margin: 1rem auto 0 auto;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
</style>
