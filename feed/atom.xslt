<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:atom="http://www.w3.org/2005/Atom">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title><xsl:value-of select="/atom:feed/atom:title"/></title>

		<style>
			:root {
				color-scheme: light dark;
			}
			
			body,
			html {
				box-sizing: border-box;
				height: fit-content;
			}
			
			*,
			:after,
			:before {
				box-sizing: inherit;
			}
			
			body {
				font-size: 1.1rem;
				line-height: 1.5;
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
					Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
				max-width: 75ch;
				margin: 0 auto;
				margin-top: 2.3em;
			}

			h1 svg {
				width: 1em;
				height: 1em;
			}
			h3 {
				margin-bottom: 0;
			}
			small {
				text: gray;
			}
			#subscribe {
				background: black;
				color: white;
				border-radius: 10px;
				padding: .5em 1em;
				margin-top: 1em;
				margin-bottom: 2em;
				display: block;
				max-width: fit-content;
				text-decoration: none;
			}
			#subscribe:hover {
				opacity: .85;
			}
		</style>
	</head>
	<body>
		<h1>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="vertical-align: text-bottom; width: 1.2em; height: 1.2em" class="pr-1" viewBox="0 0 256 256">
				<defs>
					<linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg">
						<stop offset="0.0" stop-color="#E3702D"></stop>
						<stop offset="0.1071" stop-color="#EA7D31"></stop>
						<stop offset="0.3503" stop-color="#F69537"></stop>
						<stop offset="0.5" stop-color="#FB9E3A"></stop>
						<stop offset="0.7016" stop-color="#EA7C31"></stop>
						<stop offset="0.8866" stop-color="#DE642B"></stop>
						<stop offset="1.0" stop-color="#D95B29"></stop>
					</linearGradient>
				</defs>
				<rect width="256" height="256" rx="55" ry="55" x="0" y="0" fill="#CC5D15"></rect>
				<rect width="246" height="246" rx="50" ry="50" x="5" y="5" fill="#F49C52"></rect>
				<rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg)"></rect>
				<circle cx="68" cy="189" r="24" fill="#FFF"></circle>
				<path d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z" fill="#FFF"></path>
				<path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z" fill="#FFF"></path>
			</svg>&#160;

			<xsl:value-of select="/atom:feed/atom:title"/>
		</h1>

		<p>
			<xsl:value-of select="/atom:feed/atom:subtitle"/>
		</p>

		<p>
			This is a RSS <a href="//aboutfeeds.com">news feed</a>. It is meant for <a href="//en.wikipedia.org/wiki/News_aggregator">news readers</a>, not humans.
			You can subscribe to it for free. (<a href="//roblog.nl/rss">Here's how to get started</a>.)
		</p>

		<a id="subscribe">
			<xsl:attribute name="data-title">
				<xsl:value-of select="/atom:feed/atom:title"/>
			</xsl:attribute>
			Subscribe
		</a>

    <h2>Recent posts</h2>

		<xsl:for-each select="/atom:feed/atom:entry">
      <article>
        <h3>
					<a>
						<xsl:attribute name="href">
							<xsl:value-of select="atom:id"/>
						</xsl:attribute>
						<xsl:value-of select="atom:title"/>
					</a>
				</h3>
				<small>
					<xsl:value-of select="atom:updated" />
				</small>
      </article>
		</xsl:for-each>

		<p><small><xsl:value-of select="count(/atom:feed/atom:entry)"/> news items.</small></p>
	</body>
</html>
	</xsl:template>
</xsl:stylesheet>