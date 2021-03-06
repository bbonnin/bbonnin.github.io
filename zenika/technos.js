const unknownCategory = '????'

/**
 * Category for each technology.
 */
const categories = {
    'angular': 'front',
    'cassandra': 'data',
    'kafka': 'data',
    'asciidoc': 'lang',
    'devops': 'devops',
    'elasticsearch': 'data',
    'gitlab ci': 'CI/CD',
    'gcp': 'cloud',
    'kubernetes': 'infra',
    'mercure': 'infra',
    'java': 'lang',
    'java legacy': 'lang',
    'js': 'lang',
    'jenkins': 'CI/CD',
    'lean management': 'agile',
    'nestjs': 'front',
    'nodejs': 'back',
    'python': 'lang',
    'rabbitmq': 'data',
    'reactjs': 'front',
    'rust': 'lang',
    'scrum master': 'agile',
    'serverless': 'infra',
    'software craftsmanship': 'other',
    'spring boot': 'back',
    'spring': 'back',
    'travis ci': 'CI/CD',
    'typescript': 'lang',
    'ux/ui': 'front',
    'vuejs': 'front',
    'machine learning': 'IA',
    'redis': 'data',
    'aws': 'cloud',
    'expressjs': 'front',
    'elm': 'front',
    'websockets': 'front',
    'html': 'front',
    'css':'front',
    'fastifyjs':'front',
    'typeorm': 'front',
    'mongodb':'data',
    'symfony': 'front',
    'api platform':'infra',
    'docker':'infra',
    'ansible':'devops',
    'gitlab':'CI/CD',
    'apache camel': 'back',
    'istio': 'devops',
    'apache pulsar':'data',
    'kong':'infra',
    'accompagnement front':'front',
    'graphql':'front',
    'component design':'other',
    'd3.js':'front',
    'flutter':'mobile',
    'agilité':'agile',
    'tdd':'other',
    'programmation fonctionnelle':'lang',
    'scrum':'agile',
    'cypress':'front',
    'jest':'front',
    'hyperhtml':'front',
    'vanilla js':'front',
    'spock':unknownCategory,
    'low tech':unknownCategory,
    'décentralisé / p2p':'infra',
    'gerrit':'CI/CD',
    'maven':'CI/CD',
    'sonarqube':'CI/CD',
    'webmethods':'infra',
    'architecture':'other',
    'management':'management',
    'openshift':'infra',
    'front en général':'front',
    'kotlin':'lang',
    'elk':'data',
    'html/css':'front',
    'reactive programming':'other',
    'nuxt':'front',
    'hyperledger':'other',
    'ethereum':'other',
    'api-management':unknownCategory,
    'spring cloud':'back',
    'golang':'lang',
    'prometheus':'infra',
    'hadoop':'data',
    'php':'lang',
    'terraform':'infra',
    'architecture cloud':'cloud',
    'nomad':unknownCategory,
    'ci/cd':'CI/CD',
    'gocd':unknownCategory,
    'continuous deployment':'CI/CD',
    'consul':unknownCategory,
    'grafana':'infra',
    'webassembly':'front',
    'azure':'cloud',
    'kustomize':'infra',
    'container-structure-test':'infra',
    'spring security':'back',
    'zuul':unknownCategory,
    'devops appliqué au big data (modèles)':'devops',
    'coaching agile d\'équipe':'agile',
    'coaching agile de manager':'agile',
    'management 3.0':'management',
    'kanban':'agile',
    'safe':'agile',
    'agilité à l\'échelle':'agile',
    'cadrage agile':'agile',
    'impact mapping':unknownCategory,
    'design thinking':unknownCategory,
    'atdd':unknownCategory,
    'bdd':unknownCategory,
    'spécification par l\'exemple':unknownCategory,
    'anglais':'other',
    'haskell':'lang',
    'quarkus':unknownCategory,
    'git':'CI/CD',
    'svn':'CI/CD',
    'hashicorp vault':unknownCategory,
    'spark':'data',
    'c++':'lang',
    'coaching':'management',
    'sql':'data',
    'neo4j':'data',
    'management agile':'agile',
    'microservices':'back',
    'tests exploratoires':unknownCategory,
    'user acceptance tests':unknownCategory,
    'coaching solution focus':unknownCategory,
    'question storming':unknownCategory,
    'spécifications agiles':'agile',
    'domain driven design':unknownCategory,
    'hexagonal architecture':unknownCategory,
    'c':'lang',
    'ble':unknownCategory,
    'tls':unknownCategory,
    'lucene':'data',
    'solr':'data',
    'apache nifi':'data',
    'scala':'lang',
    'pair programming':unknownCategory,
    'markdown':'lang',
    'grails': 'front',
    'spring batch':'back',
    'camel':'back',
    'linux':'infra',
    'ionic':'mobile',
    'pwa':'mobile',
    'react native':'mobile',
    'ssr':'front',
    'flink': 'data',
    'android': 'mobile',
    'kubeflow': 'IA',
    'cloud dataflow': 'data',
    'dask': 'data'
}

/**
 * Normalized name for each suggestions.
 */
const normes = {
    'angular js/2+':'angular',
    'angularjs':'angular',
    'apache cassandra':'cassandra',
    'apache kafka':'kafka',
    'apache spark':'spark',
    'spark sql': 'spark',
    'asciidoc(tor)':'asciidoc',
    'asciidoctor':'asciidoc',
    'cloud/aws':'aws',
    'devops (3 ways)':'devops',
    'elastic':'elasticsearch',
    'elastic stack':'elasticsearch',
    'gitlab pipeline':'gitlab ci',
    'go': 'golang',
    'google cloud':'gcp',
    'https://mercure.rocks':'mercure',
    'java < 8':'java legacy',
    'java >= 8':'Java',
    'javascript':'js',
    'jenkins pipeline':'jenkins',
    'la méthode du lean management':'lean management',
    'ml':'machine learning',
    'nest':'nestjs',
    'node':'nodejs',
    'node.js':'nodejs',
    'react':'reactjs',
    'react.js':'reactjs',
    'rust lang':'rust',
    'scrummaster':'scrum master',
    'software craftmanship':'software craftsmanship',
    'spring / spring boot':'spring boot',
    'spring core':'spring',
    'travis ci':'travis ci',
    'typescript':'typescript',
    'ux':'ux/ui',
    'ux / design': 'ux/ui',
    'vue js':'vuejs',
    'vue.js':'vuejs',
    'vue':'vuejs'
} 

/**
 * Normalize the name of a technology.
 */
function normalize(values) {
    return _.map(values, (val) => {
        var nom = val[0].trim().toLowerCase();
        if (normes[nom]) {
            return { nom: normes[nom], nomOrigine: val[0], connaissance: Number(val[1]), envie: Number(val[2]) }
        }

        console.log('no norm for: "' + val[0] + '"')
        return { nom: val[0].trim().toLowerCase(), nomOrigine: val[0], connaissance: Number(val[1]), envie: Number(val[2]) }
    })
}

/**
 * Return the name of a category.
 */
function getCategorie(techno) {
    var nomTechno = techno.toLowerCase();
    if (categories[nomTechno]) {
        return categories[nomTechno];
    }

    console.log('no cat for: "' + techno + '"')
    return unknownCategory;
}
