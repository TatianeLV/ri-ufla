ARG JDK_VERSION=17
ARG DSPACE_VERSION=dspace-8.1
ARG DOCKER_REGISTRY=docker.io

# Passo 1 - compilar o código com o Maven
FROM ${DOCKER_REGISTRY}/dspace/dspace-dependencies:${DSPACE_VERSION} AS build
ARG TARGET_DIR=dspace-installer
WORKDIR /app
# Cria a pasta de instalacao
RUN mkdir /install \
    && chown -Rv dspace: /install \
    && chown -Rv dspace: /app
USER dspace
# Copia o codigo para a pasta de instalacao
ADD --chown=dspace /api/ /app/
# Compila o codigo
ENV MAVEN_FLAGS="-P-test-environment -Denforcer.skip=true -Dcheckstyle.skip=true -Dlicense.skip=true -Dxml.skip=true"
RUN mvn --no-transfer-progress package ${MAVEN_FLAGS} && \
  mv /app/dspace/target/${TARGET_DIR}/* /install && \
  mvn clean
# Remove o webapp do server
RUN rm -rf /install/webapps/server/

# Passo 2 - Faz o deploy do codigo
FROM docker.io/eclipse-temurin:${JDK_VERSION} AS ant_build
ARG TARGET_DIR=dspace-installer
# Copia a pasta de instalacao para a pasta de deploy
COPY --from=build /install /dspace-src
WORKDIR /dspace-src
# Cria a pasta de deploy
ENV ANT_VERSION=1.10.13
ENV ANT_HOME=/tmp/ant-$ANT_VERSION
ENV PATH=$ANT_HOME/bin:$PATH

RUN mkdir $ANT_HOME && \
    curl --silent --show-error --location --fail --retry 5 --output /tmp/apache-ant.tar.gz \
      https://archive.apache.org/dist/ant/binaries/apache-ant-${ANT_VERSION}-bin.tar.gz && \
    tar -zx --strip-components=1 -f /tmp/apache-ant.tar.gz -C $ANT_HOME && \
    rm /tmp/apache-ant.tar.gz
# Executa os scripts de deploy
RUN ant init_installation update_configs update_code update_webapps

# Passo 3 - Inicia o DSpace
FROM docker.io/eclipse-temurin:${JDK_VERSION}
ENV DSPACE_INSTALL=/dspace
# Copia a pasta de deploy para a pasta de instalacao
COPY --from=ant_build /dspace $DSPACE_INSTALL
WORKDIR $DSPACE_INSTALL
# Instala o host 
RUN apt-get update \
    && apt-get install -y --no-install-recommends host \
    && apt-get purge -y --auto-remove \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 8080
# Aumenta a memoria do java
ENV JAVA_OPTS=-Xmx2000m
# Inicia o DSpace
ENTRYPOINT ["java", "-jar", "webapps/server-boot.jar", "--dspace.dir=$DSPACE_INSTALL"]