<template>
    <div id="cbr-task" class="ui raised very padded link card">
        <div class="content">
            <div class="ui header left aligned">Test task №7 (leading expert)</div>
            <div class="ui meta left aligned">
                <span>For candidates for the Frontend Developer position (deadline 3-7 days)</span>
            </div>
        </div>
        <div class="image">
            <img src="@/assets/vuejs-workflow.jpg">
        </div>
        <div class="content">
            <h4 class="ui sub header left aligned">Task description</h4>
            <div class="ui small feed">
                <div class="event">
                    <div class="content">
                        <div class="summary">
                            Create an interface for building a tree of elements for records with arbitrary attributes and generating a structure in JSON.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <h4 class="ui sub header left aligned">Notes</h4>
            <div class="ui small feed">
                <div class="event">
                    <div class="content">
                        <div class="summary">
                            It is allowed to use any frameworks and components.
                        </div>
                    </div>
                </div>
                <div class="event">
                    <div class="content">
                        <div class="summary">
                            If necessary, the development of the backend part in the form of a self-sufficient, i.e. does not require significant settings outside the project, bundle on a convenient technology developer.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="extra content">
            <div>
                <router-link :to="{ name: 'solution' }">
                    <a>go to solution</a>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Task'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #cbr-task {
        width: 100%;
    }

    .ui.feed > .event > .content > .summary {
        font-weight: normal;
    }
</style>
