# nodejs codefresh & helm test

This repository is a test to deploy a nodejs application on k8s using Codefresh.io and Helm.

The Nodejs application contains a [service component test](http://microservices.io/patterns/testing/service-component-test.html) connecting to a real redis database defined in docker compose.

## Developing a chart

The following are useful during chart development:

```sh
$ cd ./charts/node-js
$ helm install --dry-run --debug .
$ helm lint .
```

## Upload to s3 chart repository

Install [helm s3 plugin](https://github.com/hypnoglow/helm-s3), follow their instructions and create a new bucket to hold your charts.

When you feel ready uploaded the chart, go and run:

```sh
$ cd ./charts/node-js
$ helm package .
$ helm s3 push node-js-[VERSION].tgz [REPO_NAME]
```

You can install the helm chart within the Codefresh UI.