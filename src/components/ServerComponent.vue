<template>
  <div class="server-container">
    <div class="server-row">
      <!-- 左列 -->
      <div class="server-col">
        <div class="server-title">
          <span class="icon"></span>
          <span>{{ $t('server.animation.title') }}</span>
        </div>
        <div class="server-desc">
          <p>
            {{ $t('server.animation.desc') }}
          </p>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div class="server-col">
          <div class="server-title">
            <span class="icon"></span>
            <span>{{ $t('server.preDesign.title') }}</span>
          </div>
          <div class="server-desc">
            <p>
              {{ $t('server.preDesign.desc') }}
            </p>
          </div>
        </div>
      </div>
      <!-- 右列 -->
      <div class="server-col">
        <div class="server-title">
          <span class="icon"></span>
          <span>{{ $t('server.coverage.title') }}</span>
        </div>
        <div class="server-desc">
          <p>{{ $t('server.coverage.items.movie') }}</p>
          <p>{{ $t('server.coverage.items.series') }}</p>
          <p>{{ $t('server.coverage.items.pv') }}</p>
          <br />
          <p>{{ $t('server.coverage.items.character') }}</p>
          <p>{{ $t('server.coverage.items.cinematic') }}</p>
          <br />
        </div>
        <div class="server-col">
          <div class="server-desc">
            <p>{{ $t('server.artDesign.items.script') }}</p>
            <p>{{ $t('server.artDesign.items.concept') }}</p>
            <p>{{ $t('server.artDesign.items.style') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.server-container {
  width: 100%;
}

.server-row {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 6rem;
  gap: 8vw;
}

.server-col {
  width: 36vw;
  min-width: 34rem;
  max-width: 60rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.server-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 2.4rem;

  .icon {
    display: inline-block;
    width: 2.8rem;
    height: 2.8rem;
    background: linear-gradient(135deg, #fbe58e 60%, transparent 60%);
    border-radius: 0.6rem;
    margin-right: 1.6rem;
  }
}

.server-desc {
  font-size: 2rem;
  color: #444;
  line-height: 2.1;
  font-weight: 400;
  letter-spacing: 0.1rem;
  margin-bottom: 0;
  text-align: center;
}

@media (max-width: 90rem) {
  .server-row {
    flex-direction: column;
    align-items: center;
    gap: 3.2rem;
  }

  .server-col {
    width: 90vw;
    min-width: unset;
    max-width: unset;
  }
}
</style>
