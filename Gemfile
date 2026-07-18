source "https://rubygems.org"

# This Gemfile exists only so you can preview the site locally with:
#
#     bundle install
#     bundle exec jekyll serve
#
# GitHub Pages builds the site server-side from this same config, so local
# Ruby is optional. You can push and look at the result instead.

# `github-pages` pins Jekyll and every plugin to exactly what GitHub Pages
# runs, so a local build matches production.
gem "github-pages", "~> 232", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap", "~> 1.4"
end

# The minima theme gem is intentionally absent. The site ships its own layouts.

# Windows and JRuby do not include zoneinfo files.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Directory-watching performance booster for Windows.
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
