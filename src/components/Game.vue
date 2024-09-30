<template>
    <n-layout 
        position="absolute" 
        :native-scrollbar="false"
        content-style="height: 100%; display: flex; flex-direction: column"
    >
        <n-layout-header bordered style="padding-top: 5px">
            <game-header />
        </n-layout-header>

        <n-layout has-sider>
            <n-layout-sider
                bordered
                show-trigger
                collapse-mode="width"
                :collapsed-width="64"
                :collapsed="leftCollapsed"
                :width="245"
                :native-scrollbar="false"
                @collapse="() => handleCollapse('left')"
                @expand="() => handleExpand('left')"
            >
                <game-sidebar :collapsed="leftCollapsed" />
            </n-layout-sider>

            <n-layout has-sider sider-placement="right">
                <n-layout-content>
                    <game-tabs />
                </n-layout-content>

                <n-layout-sider
                    bordered
                    show-trigger
                    collapse-mode="width"
                    :collapsed-width="64"
                    :collapsed="rightCollapsed"
                    :width="245"
                    :native-scrollbar="false"
                    @collapse="() => handleCollapse('right')"
                    @expand="() => handleExpand('right')"
                >
                    <game-log :collapsed="rightCollapsed"/>
                </n-layout-sider>
            </n-layout>
        </n-layout>

        <n-layout-footer bordered style="flex-shrink: 0">
            <game-footer />
        </n-layout-footer>
    </n-layout>
</template>

<script setup lang="ts">
    import { ref, watchEffect, onBeforeUnmount } from 'vue';
    import GameFooter from './GameFooter.vue';
    import GameHeader from './GameHeader.vue';
    import GameLog from './GameLog.vue';
    import GameSidebar from './GameSidebar.vue';
    import GameTabs from './GameTabs.vue';

    const leftCollapsed = ref(isSmallWindow());
    const rightCollapsed = ref(isSmallWindow());
    const isSmallScreen = ref(isSmallWindow());

    const handleExpand = (side: 'left' | 'right') => {
        if (side === 'left') {
            leftCollapsed.value = false;
            if (isSmallScreen.value) rightCollapsed.value = true;
        } else {
            rightCollapsed.value = false;
            if (isSmallScreen.value) leftCollapsed.value = true;
        }
    };

    const handleCollapse = (side: 'left' | 'right') => {
    if (side === 'left') leftCollapsed.value = true;
        else rightCollapsed.value = true;
    };

    const updateScreenSize = () => {
    const wasSmallScreen = isSmallScreen.value;
    isSmallScreen.value = window.innerWidth < 700;
    
    if (isSmallScreen.value && !wasSmallScreen) {
        rightCollapsed.value = true;
    }
    };

    function isSmallWindow() {
        return window.innerWidth < 700;
    }

    window.addEventListener('resize', updateScreenSize);

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateScreenSize);
    });

    watchEffect(() => {
        updateScreenSize();
    });
</script>
