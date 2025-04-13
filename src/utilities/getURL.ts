import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.COOLIFY_FQDN) {
    return `https://${process.env.COOLIFY_FQDN}`
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.COOLIFY_FQDN) {
    return `https://${process.env.COOLIFY_FQDN}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}
