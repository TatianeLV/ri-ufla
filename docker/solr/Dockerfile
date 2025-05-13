ARG SOLR_VERSION=8.11

FROM docker.io/solr:${SOLR_VERSION}-slim

ENV AUTHORITY_CONFIGSET_PATH=/opt/solr/server/solr/configsets/authority/conf \
    OAI_CONFIGSET_PATH=/opt/solr/server/solr/configsets/oai/conf \
    SEARCH_CONFIGSET_PATH=/opt/solr/server/solr/configsets/search/conf \
    STATISTICS_CONFIGSET_PATH=/opt/solr/server/solr/configsets/statistics/conf \
    QAEVENT_CONFIGSET_PATH=/opt/solr/server/solr/configsets/qaevent/conf  \
    SUGGESTION_CONFIGSET_PATH=/opt/solr/server/solr/configsets/suggestion/conf
    
USER root

RUN mkdir -p $AUTHORITY_CONFIGSET_PATH && \
    mkdir -p $OAI_CONFIGSET_PATH && \
    mkdir -p $SEARCH_CONFIGSET_PATH && \
    mkdir -p $STATISTICS_CONFIGSET_PATH && \
    mkdir -p $QAEVENT_CONFIGSET_PATH && \
    mkdir -p $SUGGESTION_CONFIGSET_PATH


# NOTE: "solrconfigs" deve ser passado no docker-compose via "additional_contexts"
COPY --from=solrconfigs authority/conf/* $AUTHORITY_CONFIGSET_PATH/
COPY --from=solrconfigs oai/conf/* $OAI_CONFIGSET_PATH/
COPY --from=solrconfigs search/conf/* $SEARCH_CONFIGSET_PATH/
COPY --from=solrconfigs statistics/conf/* $STATISTICS_CONFIGSET_PATH/
COPY --from=solrconfigs qaevent/conf/* $QAEVENT_CONFIGSET_PATH/
COPY --from=solrconfigs suggestion/conf/* $SUGGESTION_CONFIGSET_PATH/

RUN chown -R solr:solr /opt/solr/server/solr/configsets

USER solr
